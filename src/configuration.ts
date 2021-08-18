export type CronjobConfiguration = {
  bopsName : string;
  periodMillis : number;
  arguments : Record<string, unknown>;
};
