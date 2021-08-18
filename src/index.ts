import { CronjobConfiguration } from "./configuration";
import { FunctionManager, MetaProtocol } from "meta-protocol-helper/dist/src/meta-protocol";

export class CronJob extends MetaProtocol<CronjobConfiguration> {
  constructor (config : CronjobConfiguration, manager : FunctionManager) {
    super(config, manager);

    this.validateConfiguration = this.validateConfiguration.bind(this);
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.getProtocolPublicMethods = this.getProtocolPublicMethods.bind(this);
  }

  private process : NodeJS.Timeout;

  validateConfiguration () : void {
    const errorMessage = Error("[CronJob] Failed to initialize - configuration invalid");

    if (typeof this.protocolConfiguration.bopsName !== "string") {
      throw errorMessage;
    }

    if (typeof this.protocolConfiguration.periodMillis !== "number") {
      throw errorMessage;
    }

    if (typeof this.protocolConfiguration.arguments !== "object" ||
    Array.isArray(this.protocolConfiguration.arguments)) {
      throw errorMessage;
    }
  }

  start () : void {
    console.log("[CronJob] Starting job for BOp", this.protocolConfiguration.bopsName);
    this.process = setInterval(() => {
      const bop = this.bopsManager.get(this.protocolConfiguration.bopsName);
      console.log("[CronJob] Running Job", this.protocolConfiguration.bopsName);
      bop(this.protocolConfiguration.arguments)
        .catch(() => {
          console.log("[CronJob] JOB RUN FAILED! ", this.protocolConfiguration.bopsName);
        });
    }, this.protocolConfiguration.periodMillis);
  }

  stop () : void {
    console.log("[CronJob] Stopping job for BOp", this.protocolConfiguration.bopsName);
    clearInterval(this.process);
  }

  getProtocolPublicMethods () : Record<string, Function> {
    return {
      stopJob: this.stop,
      startJob: this.start,
    };
  }
}
