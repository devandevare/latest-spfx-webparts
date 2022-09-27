import * as React from 'react';
import styles from './GetSpPageHtml.module.scss';
import { IGetSpPageHtmlProps } from './IGetSpPageHtmlProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { Stack } from '@fluentui/react';
import { PrimaryButton } from '@fluentui/react/lib/Button';
import { TextField } from '@fluentui/react/lib/TextField';
import { spfi, SPFx } from '@pnp/sp';
import "@pnp/sp/site-users/web";
import * as $ from 'jquery';
import { Web } from "@pnp/sp/webs";
import "@pnp/sp/webs";
import "@pnp/sp/files";
import "@pnp/sp/folders";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import { IClientsidePage } from "@pnp/sp/clientside-pages";


interface IGetSpPageHtmlState {
  url: string;
  content: any;
}
let sp;
export default class GetSpPageHtml extends React.Component<IGetSpPageHtmlProps, IGetSpPageHtmlState> {
  constructor(props) {
    super(props);
    sp = spfi().using(SPFx(this.props.context));
    this.state = {
      url: " ",
      content: null
    }

  }

  public onchangeUrlField = (item, e) => {
    // console.log("e", e);
    this.setState({ url: e });

  }

  public getPageHtml = async () => {

    
    


    console.log("sp", sp.web.webs);
    // const page: IClientsidePage = await sp.web.loadClientsidePage("sites/DevanTest/SitePages/GNS-Portal.aspx").pageLayout.getText();
    // get the current value
    // const value = page.pageLayout;
    // console.log(page);
    try {
      sp = spfi("https://sonorasoftware0.sharepoint.com/sites/DevanTest/").using(SPFx(this.context));

      const r = await sp.web.lists.getByTitle("Site Pages").items
        .select("Title", "FileRef", "FieldValuesAsText/MetaInfo")
        .expand("FieldValuesAsText")
        ();

      // look through the returned items.
      for (var i = 0; i < r.length; i++) {

        // the title field value
        console.log(r[i]);
        debugger
        // find the value in the MetaInfo string using regex
        const matches = /PublishingPageImage:SW\|(.*?)\r\n/ig.exec(r[i].FieldValuesAsText.MetaInfo);
        // if (matches !== null && matches.length > 1) {

        // this wil be the value of the PublishingPageImage field
        console.log("matches", matches);
        // }
      }
    }
    catch (e) {
      console.error(e);
    }



    // sp.web.getFileByServerRelativeUrl('/sites/DevanTest/SitePages/GNS-Portal.aspx').getText().then(console.log)

    // fetch('https://sonorasoftware0.sharepoint.com/sites/DevanTest/SitePages/GNS-Portal.aspx', {
    //   method: 'GET',
    //   credentials: 'same-origin',

    // }).then(response => response.text())
    //   .then(console.log);

    // let arr: any;
    // sp.web.getFileByServerRelativeUrl('/sites/DevanTest/SitePages/GNS-Portal.aspx').getText().then(console.log);
    // sp.web.getFileByServerRelativeUrl('/sites/DevanTest/Pages/GNS-Portal.aspx').listItemAllFields.select('PublishingPageContent').get()
    //   .then(res => {
    //     console.log(res.PublishingPageContent);
    //   });
    // ?$filter=Title eq '" +"GNS-Portal" +"'"
    //   var strUrl = "https://sonorasoftware0.sharepoint.com/sites/DevanTest/_api/web/GetFileByServerRelativeUrl('/sites/DevanTest/SitePages/GNS-Portal.aspx')/Publish()";
    var url = "https://sonorasoftware0.sharepoint.com/sites/DevanTest/_api/web/lists/getByTitle('Site Pages')/items?$filter=Title eq '" + "GNS Portal" + "'";
    $.ajax({
      url: url,
      // type: "GET",
      dataType: 'json',
      async: false,
      data: {},
      success: function (data) {
        // console.log("data", data);
        if (data.value.length > 0) {
          console.log(data.value[0])
          console.log("CanvasContent1", data.value[0].CanvasContent1);
          this.setState({ content: data.value[0].LayoutWebpartsContent });
          console.log("LayoutWebpartsContent", data.value[0].LayoutWebpartsContent);
        }
        else {
          console.log("Error for page:" + "GNS-Portal.aspx");
        }

      }.bind(this),
      error: function (error) {
        console.log("error", error);
      }
    });
    // var webAbsoluteUrl = "https://sonorasoftware0.sharepoint.com/";
    // var webRelativeUrl = "/sites/DevanTest/";
    // var filePath = "SitePages/GNS-Portal.aspx";
    // console.log("sp", '${webRelativeUrl}${filePath}');
    // let web = new Web(webAbsoluteUrl);

    // await web.getFileByServerRelativeUrl(webRelativeUrl + filePath).listItemAllFields.get()
    //   .then(res => {
    //     console.log(res.PublishingPageContent);
    //   });
    // const list: any[] = await sp.web.lists.getByTitle("SitePages").items();
    // console.log("list", list);
    // const text: string = await sp.web.getFileByServerRelativePath("/sites/DevanTest/SitePages/GNS-Portal.aspx").getText();
    // console.log("text", text);
    //   $pnp.sp.web
    //     .getFileByServerRelativeUrl('/[webUrl]/Pages/Test.aspx')
    //     .listItemAllFields.select('PublishingPageContent').get()
    //     .then(res => {
    //       console.log(res.PublishingPageContent);
    //     });



  }
  public render(): React.ReactElement<IGetSpPageHtmlProps> {
    return (
      <div id="test">
        <Stack >
          <Stack.Item style={{ width: 500 }}>
            <TextField label="Enter a URl" onChange={this.onchangeUrlField} value={this.state.url} />
          </Stack.Item>
          <Stack.Item>
            <PrimaryButton style={{ width: 200 }} onClick={this.getPageHtml}>
              Get HTML
            </PrimaryButton>
          </Stack.Item>
          <div id='div1'>
            {this.state.content}
          </div>
        </Stack>
      </div>
    );
  }
}
