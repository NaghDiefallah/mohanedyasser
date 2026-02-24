/**
 * Task Scheduler - Break long tasks into smaller chunks using requestIdleCallback
 * This helps reduce main-thread blocking and improves perceived performance
 */

type Task = () => void | Promise<void>;

/**
 * Schedule a task to run during idle time
 * Falls back to setTimeout if requestIdleCallback is not available
 */
export const scheduleTask = (task: Task, options?: IdleRequestOptions): void => {
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
      task();
    }, options);
  } else {
    setTimeout(task, 0);
  }
};

/**
 * Batch multiple tasks and execute them with idle time between
 */
export const batchTasks = (tasks: Task[], options?: IdleRequestOptions): Promise<void> => {
  return new Promise((resolve) => {
    let index = 0;

    const executeBatch = () => {
      if (index < tasks.length) {
        const task = tasks[index];
        index++;
        Promise.resolve(task()).then(() => {
          if (index < tasks.length) {
            scheduleTask(executeBatch, options);
          } else {
            resolve();
          }
        });
      } else {
        resolve();
      }
    };

    scheduleTask(executeBatch, options);
  });
};

/**
 * Throttle a function to prevent excessive calls
 */
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): T => {
  let inThrottle: boolean;
  return function (this: any, ...args: any[]) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  } as T;
};

/**
 * Debounce a function to delay execution
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout;
  return function (this: any, ...args: Parameters<T>) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
};

export default {
  scheduleTask,
  batchTasks,
  throttle,
  debounce,
};
