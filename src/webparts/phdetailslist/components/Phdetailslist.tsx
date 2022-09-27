import * as React from 'react';
import './Phdetailslist.module.scss';
import { IPhdetailslistProps } from './IPhdetailslistProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { Stack, StackItem } from '@fluentui/react/lib/Stack';
import { spfi, SPFx } from '@pnp/sp';
import { Label } from '@fluentui/react/lib/Label';
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import { CheckboxVisibility, DetailsList, IColumn, IDetailsColumnStyles, SelectionMode } from '@fluentui/react/lib/DetailsList';
import { getTheme } from '@fluentui/react/lib/Styling';
import { IIconProps } from '@fluentui/react/lib/Icon';
import { IButtonStyles, IconButton } from '@fluentui/react/lib/Button';
import { Checkbox, DatePicker, defaultDatePickerStrings, Modal } from '@fluentui/react';

const theme = getTheme();

const DELETEICON: IIconProps = { iconName: 'Delete', style: { color: "#DE3B3B", fontSize: "18px", float: 'right' } };
const EDITICON: IIconProps = { iconName: 'Edit', style: { color: "#15A69C", fontSize: "18px" } };
const cancelIcon: IIconProps = { iconName: 'Cancel', style: { color: "#508098", fontSize: "14px" } };
const CheckList: IIconProps = { iconName: 'CheckList', style: { color: "#15A69C", fontSize: "20px", float: 'left' } };
const Attach: IIconProps = { iconName: 'Attach', style: { color: "#15A69C", paddingRight: "20px", fontSize: "20px", float: 'left' } };
const Message: IIconProps = { iconName: 'Message', style: { color: "#15A69C", paddingRight: "20px", fontSize: "20px", float: 'left' } };
const PageEdit: IIconProps = { iconName: 'PageEdit', style: { color: "#15A69C", fontSize: "20px", float: 'left' } };
const Add: IIconProps = { iconName: 'Add', style: { color: "#15A69C", fontSize: "20px" } };




const THEME = getTheme();

const iconButtonStyles: Partial<IButtonStyles> = {
  root: {
    color: THEME.palette.neutralPrimary,
    marginLeft: 'auto',
    marginTop: '4px',
    marginRight: '2px'
    // float: "left"

  },
  rootHovered: {
    color: THEME.palette.neutralDark,
  },
};

const addIconheaderStyle: Partial<IDetailsColumnStyles> = {
  cellTitle: {
    color: "#508098",
    backgroundColor: "#F1FAF9",
    letterSpacing: "-0.24px",
    font: " normal normal 30px Segoe UI",
    textTransform: "uppercase",
    // width: "910px",
    height: "46px",
  }
}
const headerStyle: Partial<IDetailsColumnStyles> = {
  cellTitle: {
    color: "#508098",
    backgroundColor: "#F1FAF9",
    letterSpacing: "-0.24px",
    font: " normal normal 12px Segoe UI",
    textTransform: "uppercase",
    // width: "910px",
    height: "46px",
  }
}

const addIcon = <IconButton styles={iconButtonStyles} iconProps={Add} ariaLabel="Add" />;
const columns: IColumn[] = [
  {
    key: 'checkbox',
    name: '+',
    fieldName: 'checkbox',
    minWidth: 70,
    maxWidth: 70,
    isRowHeader: true,
    isResizable: true,
    isSorted: false,
    isSortedDescending: false,
    sortAscendingAriaLabel: 'Sorted A to Z',
    sortDescendingAriaLabel: 'Sorted Z to A',
    // onColumnClick: this._onColumnClick,
    data: 'string',
    isPadded: false,
    styles: addIconheaderStyle,
    headerClassName: "detailslistaddiconheader",
    className: "detailslistaddicon"



  },
  {
    key: 'ChecklistItem',
    name: 'Checklist title',
    fieldName: 'ChecklistItem',
    minWidth: 92,
    maxWidth: 92,
    isRowHeader: true,
    isResizable: true,
    isSorted: false,
    isSortedDescending: false,
    sortAscendingAriaLabel: 'Sorted A to Z',
    sortDescendingAriaLabel: 'Sorted Z to A',
    // onColumnClick: this._onColumnClick,
    data: 'string',
    isPadded: false,
    styles: headerStyle,
    className: "detailslistheader"

  },
  {
    key: 'StartDate',
    name: 'TARGET START DATE',
    fieldName: 'StartDate',
    minWidth: 113,
    maxWidth: 113,
    isRowHeader: true,
    isResizable: true,
    isSorted: false,
    isSortedDescending: false,
    data: 'date',
    isPadded: false,
    styles: headerStyle,
    className: "detailslistheader"
  },
  {
    key: 'DueDate',
    name: 'TARGET END DATE',
    fieldName: 'DueDate',
    minWidth: 102,
    maxWidth: 102,
    isRowHeader: true,
    isResizable: true,
    isSorted: false,
    isSortedDescending: false,
    data: 'date',
    isPadded: false,
    styles: headerStyle,
    className: "detailslistheader"
  },
  {
    key: 'ACTUALSTARTDATE',
    name: 'ACTUAL START DATE',
    fieldName: 'ACTUALSTARTDATE',
    minWidth: 114,
    maxWidth: 114,
    isRowHeader: true,
    isResizable: true,
    isSorted: false,
    isSortedDescending: false,
    data: 'string',
    isPadded: false,
    styles: headerStyle,
    className: "detailslistheader"
  },
  {
    key: 'ACTUALENDDATE',
    name: 'ACTUAL END DATE',
    fieldName: 'ACTUALENDDATE',
    minWidth: 103,
    maxWidth: 103,
    isRowHeader: true,
    isResizable: true,
    isSorted: false,
    isSortedDescending: false,
    data: 'string',
    isPadded: false,
    styles: headerStyle,
    className: "detailslistheader"
  },
  {
    key: 'MODIFIEDBY',
    name: 'MODIFIED BY',
    fieldName: 'MODIFIEDBY',
    minWidth: 74,
    maxWidth: 74,
    isRowHeader: true,
    isResizable: true,
    isSorted: false,
    isSortedDescending: false,
    data: 'string',
    isPadded: false,
    styles: headerStyle,
    className: "detailslistheader"
  },
  {
    key: 'actions',
    name: 'actions',
    fieldName: 'actions',
    minWidth: 30,
    maxWidth: 30,
    isRowHeader: true,
    isResizable: true,
    isSorted: false,
    isSortedDescending: false,
    data: 'string',
    isPadded: false,
    styles: headerStyle,
    className: "actioncolumn",
    headerClassName: "actioncolumnHeader"
  },

];

const g_Actions = < Stack horizontal>
  <StackItem align='start'>
    <IconButton styles={iconButtonStyles} iconProps={PageEdit} ariaLabel="PageEdit" />
    <IconButton styles={iconButtonStyles} iconProps={DELETEICON} ariaLabel="deleteicon" />
  </StackItem>

</Stack >;


interface IPhdetailslistState {
  checklist: any;
  taskModalOpen: boolean;
}

let sp = null;
export default class Phdetailslist extends React.Component<IPhdetailslistProps, IPhdetailslistState> {
  constructor(props: any) {
    super(props)
    sp = spfi().using(SPFx(this.props.context));

    this.state = {
      checklist: [],
      taskModalOpen: false,

    }
  }

  componentDidMount(): void {
    this._getListData();
  }
  /**
   * _onchangeCheckbox
   */
  public _onchangeCheckbox=(id,e) =>{
    console.log("e checkbox", id)
    console.log("input checkbox", e.currentTarget.checked)
    if(e.currentTarget.checked==true){
      
    }

  }
  public _getListData = async () => {
    var checklistArr = [];
    console.log("SP SETUP", sp)
    const practices = await sp.web.lists.getByTitle("Test Practice 1 Checklist").items();
    console.log("Test Practice 1 Checklist", practices);
    practices.map((row) => {
      checklistArr.push({
        checkbox: <Checkbox id={row.ChecklistItem} onChange={this._onchangeCheckbox.bind(this,row.ChecklistItem)} className='allcheckbox' />,
        ChecklistItem: row.ChecklistItem,
        StartDate: row.StartDate,
        DueDate: row.DueDate,
        Priority: row.Priority,
        UserResponsible: row.UserResponsible,
        TeamResponsible: row.TeamResponsible,
        ParentTask: row.ParentTask,
        StageNo: row.StageNo,
        MasterCheckListId: row.MasterCheckListId,
        actions: g_Actions,

      })
    })
    this.setState({ checklist: checklistArr });

  }
  public render(): React.ReactElement<IPhdetailslistProps> {


    return (
      <Stack>
        <a href="#" onClick={() => this.setState({ taskModalOpen: true })}> Task 1</a>

        <Modal
          isOpen={this.state.taskModalOpen}
          onDismiss={() => this.setState({ taskModalOpen: false })}
          isBlocking={true}
          allowTouchBodyScroll={true}
          // scrollableContentClassName="scrollableContentClassName"
          containerClassName="taskModalContainer"
        >
          <Stack style={{ paddingLeft: 30, paddingRight: 30 }}>
            <Stack horizontal horizontalAlign="space-between" >
              <StackItem className='TaskLabelStackitem'>
                <Label className='TaskLabel'>
                  Task 1
                </Label>
              </StackItem>
              <StackItem className='taskModalCloseIconStackitem'>
                <IconButton
                  styles={iconButtonStyles}
                  iconProps={cancelIcon}
                  ariaLabel="Close popup modal"
                  onClick={() => this.setState({ taskModalOpen: false })}
                />
              </StackItem>
            </Stack>
            <Stack horizontal style={{ paddingBottom: 20 }} >
              <StackItem style={{ paddingRight: 24 }}>
                <Stack>
                  <StackItem >
                    <Label className='taskModalAllLabels' >Target Start Date</Label>
                  </StackItem>
                  <StackItem >
                    <DatePicker

                      // firstDayOfWeek={firstDayOfWeek}
                      showWeekNumbers={true}
                      firstWeekOfYear={1}
                      showMonthPickerAsOverlay={false}
                      placeholder="Select a date..."
                      ariaLabel="Select a date"
                      // DatePicker uses English strings by default. For localized apps, you must override this prop.
                      strings={defaultDatePickerStrings}
                      className='DatePicker'

                    />
                  </StackItem>
                </Stack>
              </StackItem>
              <StackItem style={{ float: 'left' }} >
                <Stack>
                  <StackItem>
                    <Label className='taskModalAllLabels' >Target End Date</Label>
                  </StackItem>
                  <StackItem >
                    <DatePicker

                      // firstDayOfWeek={firstDayOfWeek}
                      showWeekNumbers={true}
                      firstWeekOfYear={1}
                      showMonthPickerAsOverlay={false}
                      placeholder="Select a date..."
                      ariaLabel="Select a date"
                      // DatePicker uses English strings by default. For localized apps, you must override this prop.
                      strings={defaultDatePickerStrings}
                      className='DatePicker'

                    />
                  </StackItem>
                </Stack>
              </StackItem>
            </Stack>
            <Stack horizontal style={{ paddingBottom: 20 }} >
              <StackItem style={{ paddingRight: 24 }}>
                <Stack>
                  <StackItem >
                    <Label className='taskModalAllLabels' >Actual Start Date</Label>
                  </StackItem>
                  <StackItem >
                    <DatePicker

                      // firstDayOfWeek={firstDayOfWeek}
                      showWeekNumbers={true}
                      firstWeekOfYear={1}
                      showMonthPickerAsOverlay={false}
                      placeholder="Select a date..."
                      ariaLabel="Select a date"
                      // DatePicker uses English strings by default. For localized apps, you must override this prop.
                      strings={defaultDatePickerStrings}
                      className='DatePicker'

                    />
                  </StackItem>
                </Stack>
              </StackItem>
              <StackItem style={{ float: 'left' }} >
                <Stack>
                  <StackItem>
                    <Label className='taskModalAllLabels' >Actual End Date</Label>
                  </StackItem>
                  <StackItem >
                    <DatePicker

                      // firstDayOfWeek={firstDayOfWeek}
                      showWeekNumbers={true}
                      firstWeekOfYear={1}
                      showMonthPickerAsOverlay={false}
                      placeholder="Select a date..."
                      ariaLabel="Select a date"
                      // DatePicker uses English strings by default. For localized apps, you must override this prop.
                      strings={defaultDatePickerStrings}
                      className='DatePicker'

                    />

                  </StackItem>
                </Stack>
              </StackItem>
            </Stack>
            <Stack horizontal  >
              <StackItem align="start" style={{ paddingRight: 170 }} >
                <Stack>
                  <StackItem >
                    <Label className='taskModalAllLabels' >Assigned To</Label>
                  </StackItem>
                  <StackItem >
                    <Label>Amit</Label>
                  </StackItem>
                </Stack>
              </StackItem>
              <StackItem align="center" style={{ paddingRight: 507 }}  >
                <Stack style={{ float: 'left' }}>
                  <StackItem>
                    <Label className='taskModalAllLabels' >Checklists</Label>
                  </StackItem>
                  <StackItem >
                    <Label>0/3</Label>
                  </StackItem>
                </Stack>
              </StackItem>
              <StackItem style={{ float: "right", alignSelf: "end" }}  >
                <Stack>
                  <StackItem>
                    <IconButton styles={iconButtonStyles} iconProps={Attach} ariaLabel="Attach" />
                    <IconButton styles={iconButtonStyles} iconProps={Message} ariaLabel="Message" />
                    <IconButton styles={iconButtonStyles} iconProps={CheckList} ariaLabel="editIcon" />
                  </StackItem>

                </Stack>
              </StackItem>
            </Stack>
            <Stack className='detailslistStack'>
              <DetailsList
                items={this.state.checklist}
                className="detailslist"
                columns={columns}
                selectionMode={SelectionMode.none}
              />
            </Stack>
          </Stack>
        </Modal>

      </Stack >
    );
  }
}
