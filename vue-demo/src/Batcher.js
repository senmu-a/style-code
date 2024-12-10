function Batcher() {
  this.reset();
}

Batcher.prototype = {
  reset: function() {
    this.has = {};
    this.queue = [];
    this.isWaiting = false;
  },
  push: function(job) {
    let id = job.id;//watcher
    if (!this.has[id]) {
        // console.log(batcher);
        this.queue.push(job);
        this.has[id] = true;
        if (!this.waiting) {//没有等
            this.waiting = true;
            if ("Promise" in window) {
                // requestAnimationFrame
                Promise.resolve().then(() => {
                    this.flush();
                })
            } else {
                setTimeout(() => {
                    this.flush();
                }, 0);
            }
        }
    }
  },
  flush: function() {
    this.queue.forEach(function(job) {
      job.cb();
    });
    this.reset();
  }
}