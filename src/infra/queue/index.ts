import { Job, Queue, Worker } from "bullmq";
import ImageUploadProcessor from "./image-upload.processor";
import { Jobs, Queues } from "./enum";

export default class QueueService {
  private queues!: Record<string, Queue>;
  private imageUploadQueue!: Queue;

  private static imageUploadWorker: Worker;
  private static instance: QueueService;

  private static QUEUE_OPTIONS = {
    connection: {
      host: "127.0.0.1",
      port: 6379,
    },
  };

  constructor() {
    if (QueueService.instance instanceof QueueService) {
      return QueueService.instance;
    }

    this.queues = {};
    QueueService.instance = this;

    this.instantiateQueues();
  }

  async instantiateQueues() {
    this.imageUploadQueue = new Queue(
      Queues.IMAGE_UPLOAD,
      QueueService.QUEUE_OPTIONS
    );

    this.queues[Queues.IMAGE_UPLOAD] = this.imageUploadQueue;
  }

  getQueue(name: Queues) {
    return this.queues[name];
  }

  public static async instantiateWorkers() {
    this.imageUploadWorker = new Worker(
      Queues.IMAGE_UPLOAD,
      async (job: Job) => {
        switch (job.name) {
          case Jobs.UPLOAD:
            await ImageUploadProcessor.processUpload(job);
            break;
        }
        console.log(`${Jobs.UPLOAD} Worker for image queue`);
      },
      { connection: QueueService.QUEUE_OPTIONS.connection }
    );

    this.imageUploadWorker.on("completed", (job: Job, value) => {
      console.log(
        `${Queues.IMAGE_UPLOAD} Completed job with data\n
          Data: ${job.asJSON().data}\n
          Value: ${value}
        `
      );
    });

    this.imageUploadWorker.on("failed", (job, value) => {
      console.log(
        `${Queues.IMAGE_UPLOAD} Failed job with data\n
          Value: ${value}
        `
      );
    });
  }
}
