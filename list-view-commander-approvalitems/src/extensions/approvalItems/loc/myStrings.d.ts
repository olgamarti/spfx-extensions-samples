declare interface IApprovalItemsCommandSetStrings {
  Command1: string;
  Command2: string;
}

declare module 'ApprovalItemsCommandSetStrings' {
  const strings: IApprovalItemsCommandSetStrings;
  export = strings;
}
