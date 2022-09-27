declare interface IGetSpPageHtmlWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
  AppLocalEnvironmentSharePoint: string;
  AppLocalEnvironmentTeams: string;
  AppSharePointEnvironment: string;
  AppTeamsTabEnvironment: string;
}

declare module 'GetSpPageHtmlWebPartStrings' {
  const strings: IGetSpPageHtmlWebPartStrings;
  export = strings;
}
