declare namespace google {
  namespace script {
    interface Run {
      withSuccessHandler(callback: Function): Run;
      withFailureHandler(callback: Function): Run;
      [functionName: string]: (...args: any[]) => void;
    }
    const run: Run;
  }
}