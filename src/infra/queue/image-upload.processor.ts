import { Job } from "bullmq";
import { Queues } from "./enum";
import QueueService from ".";

export default class ImageUploadProcessor {
  static async processUpload(job: Job) {
    const queue = new QueueService().getQueue(Queues.IMAGE_UPLOAD);
    if (!queue) return;

    console.log(`Process job from the ${Queues.IMAGE_UPLOAD} queue`);
  }
}
