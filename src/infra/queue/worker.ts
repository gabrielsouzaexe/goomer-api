import QueueService from ".";

(async () => {
  await QueueService.instantiateWorkers();
})();
