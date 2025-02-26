/* eslint-disable no-unused-vars */
declare global {
  interface String {
    createPrompt(schema: string): string;
  }
}

String.prototype.createPrompt = function (schema: string) {
  return `${schema} \nProvide only the aggregation pipeline to: ${this.trim()}.\nIn json without json notation.`;
};

export {};
