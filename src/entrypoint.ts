import { CronJob, startJobDefinition, stopJobDefinition } from "./index.js";
import { CronjobConfiguration } from "./configuration.js"

export const configure = (broker, configuration : CronjobConfiguration) => {
  const jobBop = broker.bopFunctions.getBopFunction(configuration.bopsName);

  broker.addonsFunctions.preregister(
    stopJobDefinition
  )

  broker.addonsFunctions.preregister(
    startJobDefinition
  )

  broker.done()

  return {
    jobBop,
    period: configuration.periodMillis,
    name: configuration.bopsName,
    arguments: configuration.arguments
  }
}

export const boot = (broker, context) => {
  const JobExecution = new CronJob(
    broker.logger,
    context.jobBop,
    context.name,
    context.period,
    context.arguments
  )

  broker.addonsFunctions.setRegistered(stopJobDefinition.functionName, JobExecution.stop)
  broker.addonsFunctions.setRegistered(startJobDefinition.functionName, JobExecution.start)

  JobExecution.start()
}