import { ObjectDefinition } from "@meta-system/object-definition";

export type FunctionDefinition = {
  input : ObjectDefinition;
  output : ObjectDefinition;
  functionName : string;
}

export type MetaSystemFunction = {
  function : Function;
  definition : FunctionDefinition;
}

type LoggerFunction = (...data : unknown[]) => void
export type LoggerType = {
  fatal : LoggerFunction;
  success : LoggerFunction;
  operation : LoggerFunction;
  error : LoggerFunction;
  warn : LoggerFunction;
  info : LoggerFunction;
  debug : LoggerFunction;
}

export class CronJob {
  constructor (
    private logger : LoggerType,
    private functionToExecute : Function,
    private functionName : string,
    private period : number,
    private readonly execArgs : any) {

    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.getProtocolPublicMethods = this.getProtocolPublicMethods.bind(this);
  }

  private process : NodeJS.Timeout;

  start () : void {
    this.logger.info("[CronJob] Starting job for BOp: ", this.functionName);
    this.process = setInterval(() => {
      this.logger.info("[CronJob] Running Job: ", this.functionName);
      this.functionToExecute(this.execArgs)
        ?.catch((error : Error) => {
          this.logger.info("[CronJob] JOB RUN FAILED! ", this.functionName);
          this.logger.error(error);
        });
    }, this.period);
  }

  stop () : void {
    this.logger.info("[CronJob] Stopping job for BOp: ", this.functionName);
    clearInterval(this.process);
  }

  getProtocolPublicMethods () : MetaSystemFunction[] {
    const stopJobMetaSystemFunction : MetaSystemFunction = {
      function: this.stop,
      definition: stopJobDefinition
    }

    const startJobMetaSystemFunction : MetaSystemFunction = {
      function: this.start,
      definition: startJobDefinition
    }

    return [
      stopJobMetaSystemFunction,
      startJobMetaSystemFunction,
    ]
  }
}

export const stopJobDefinition : FunctionDefinition = {
  functionName: "stopJob",
  input: {},
  output: {}
}

export const startJobDefinition : FunctionDefinition = {
  functionName: "startJob",
  input: {},
  output: {}
}