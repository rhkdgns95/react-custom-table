import React from 'react';
import DataGrid, { Column, FilterRow, HeaderFilter, SearchPanel, Pager, Paging, Export, Editing, Selection, Summary, TotalItem } from 'devextreme-react/data-grid';
import { SelectBox, CheckBox, Button } from 'devextreme-react';
import service from './data';
import { useAppContext } from '../../Components/App/AppProvider';
import DataSource from 'devextreme/data/data_source';
import ArrayStore from 'devextreme/data/array_store';


/**
 * 
 *  Paging: https://js.devexpress.com/Documentation/Guide/Widgets/DataGrid/Paging/#User_Interaction
 *  
 */


const saleAmountEditorOptions = { format: 'currency', showClearButton: true };

/**
 * 
 *  GridContainer
 * 
 *  - 기능
 *  정렬, 필터링, 페이지네이션,
 *   
 *  
 */

 

/*
 *  props
 *  - defaultPageSize
 */

/**
 *  State
 *  - showFilterRow: 
 *  - showHeaderFilter: 
 *  - currentFilter: 현재 필터링 된 칼럼.
 *  - pageSize: 테이블에 보이는 row갯수.
 *
 */
interface IState {
  showFilterRow: any;
  showHeaderFilter: any;
  currentFilter: any;  
  pageSize: number;    
  isGridDetails: boolean;
  selectTextOnEditStart: boolean;
  startEditAction: 'click' | 'dblClick';
  mode: 'nextColumn' | 'widget';
  selectedItemKeys: Array<number>;
}

const resizingModes: Array<'nextColumn' | 'widget'> = ['nextColumn', 'widget'];


const dataSource = new DataSource({
  store: new ArrayStore({
    data: service.getOrders(),
    key: 'ID'
  })
});

class GridContainer extends React.Component<any, IState> {
    orders: any;
    applyFilterTypes: any;
    saleAmountHeaderFilter: any;
    dataGrid: any;
    column: any;
    defaultPageSize: number; 
    pageIndex: Array<number>;

    constructor(props) {
    super(props);
    this.state = {
      showFilterRow: true,
      showHeaderFilter: true,
      currentFilter: 1,
      pageSize: 10,
      selectTextOnEditStart: true,
      startEditAction: 'dblClick',
      mode: resizingModes[0],
      selectedItemKeys: [],
      isGridDetails: false
    };

    this.defaultPageSize = 10;
    // 데이터 바뀌면, 아래 orders는 dataSource와 다르게 넣어줄 것.
    this.orders = dataSource;
    console.log("ORDERS: ", this.orders.store()._array);
    // this.pageIndex = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20];
    this.pageIndex = Array.from({ length: 10 }, (_, count) => (count + 1) * 2);
    

    this.applyFilterTypes = [{
      key: 'auto',
      name: 'Immediately'
    }, {
      key: 'onClick',
      name: 'On Button Click'
    }];
    this.saleAmountHeaderFilter = [{
      text: 'Less than $3000',
      value: ['SaleAmount', '<', 3000]
    }, {
      text: '$3000 - $5000',
      value: [
        ['SaleAmount', '>=', 3000],
        ['SaleAmount', '<', 5000]
      ]
    }, {
      text: '$5000 - $10000',
      value: [
        ['SaleAmount', '>=', 5000],
        ['SaleAmount', '<', 10000]
      ]
    }, {
      text: '$10000 - $20000',
      value: [
        ['SaleAmount', '>=', 10000],
        ['SaleAmount', '<', 20000]
      ]
    }, {
      text: 'Greater than $20000',
      value: ['SaleAmount', '>=', 20000]
    }];
    
    this.dataGrid = null;
    this.orderHeaderFilter = this.orderHeaderFilter.bind(this);
    this.onShowFilterRowChanged = this.onShowFilterRowChanged.bind(this);
    this.onShowHeaderFilterChanged = this.onShowHeaderFilterChanged.bind(this);
    this.onCurrentFilterChanged = this.onCurrentFilterChanged.bind(this);
    this.onChangePageSize = this.onChangePageSize.bind(this);
    this.onSelectTextOnEditStartChanged = this.onSelectTextOnEditStartChanged.bind(this);
    this.onStartEditActionChanged = this.onStartEditActionChanged.bind(this);
    this.changeResizingMode = this.changeResizingMode.bind(this);
    this.selectionChanged = this.selectionChanged.bind(this);
    this.deleteRecords = this.deleteRecords.bind(this);
    this.toggleGridTableDetails = this.toggleGridTableDetails.bind(this);
  }

  render() {
    return (
      <div>
        <button onClick={this.toggleGridTableDetails} style={{
            backgroundColor: "white",
            padding: "5px 7px",
            borderRadius: "3px",
            border: "1px solid #dfdfdf",
            cursor: "pointer",
            margin: "5px 0",
            textAlign: 'right',
            marginLeft: 'auto',
            display: 'block',
            fontSize: '11px',
            color: 'gray'
        }}>
          { this.state.isGridDetails ? "숨기기" : "자세히" }
        </button>
         <div className="options" style={this.state.isGridDetails ? { height: "auto", opacity: 1, transition: ".5s" } : { opacity: 0, height: 0, zIndex: -1, cursor: "default", transform: 'scale(0)', marginRight: "20%" } }>
          {/* <div className="caption">Options</div> */}
          {/* Start - Edit Options */}
          <div className="option">
            <span>Start Edit Action</span>
                &nbsp;
            <SelectBox
              items={['click', 'dblClick']} 
              value={this.state.startEditAction}
              onValueChanged={this.onStartEditActionChanged}>
            </SelectBox>
          </div>
          <div className="option">
            <CheckBox
              value={this.state.selectTextOnEditStart}
              text="Select Text on Edit Start"
              onValueChanged={this.onSelectTextOnEditStartChanged}
            />
          </div>
          {/* End - Edit Options */}
          {/* Start - Filter Options */}
          <div className="option">
            <span>Apply Filter </span>
            <SelectBox items={this.applyFilterTypes}
              value={this.state.currentFilter}
              onValueChanged={this.onCurrentFilterChanged}
              valueExpr="key"
              displayExpr="name"
              disabled={!this.state.showFilterRow} />
          </div>
          <div className="option">
            <CheckBox text="Filter Row"
              value={this.state.showFilterRow}
              onValueChanged={this.onShowFilterRowChanged} />
          </div>
          <div className="option">
            <CheckBox text="Header Filter"
              value={this.state.showHeaderFilter}
              onValueChanged={this.onShowHeaderFilterChanged} />
          </div>
          {/* End - Filter Options */}
          {/* Start - Resizing */}
          <div className="option">
            <span>Column resizing mode:&nbsp;</span>
            <SelectBox items={resizingModes}
              value={this.state.mode}
              width={250}
              onValueChanged={this.changeResizingMode} />
          </div>
          {/* End - Resizing */}
        </div>
        pageCount: 
        <select onChange={this.onChangePageSize} defaultValue={this.defaultPageSize} style={{
          padding: "5px 7px",
          borderRadius: "3px",
          border: "1px solid #dfdfdf",
          cursor: "pointer",
          margin: "3px"
        }}>
          {
            this.pageIndex.map((item, key) => <option key={key} value={item}>{ item }</option> )
          }
        </select>
        

        <Editing
            mode="cell"
            allowUpdating={true} />
        <Button id="gridDeleteSelected"
          text="Delete Selected Records"
          height={34}
          disabled={!this.state.selectedItemKeys.length}
          onClick={this.deleteRecords} />
        <DataGrid id="gridContainer"
          ref={(ref) => this.dataGrid = ref}
          dataSource={this.orders}
          showBorders={true}
          allowColumnResizing={true}
          selectedRowKeys={this.state.selectedItemKeys}
          onSelectionChanged={this.selectionChanged}
          onRowUpdated={data => {
            // Table 전체 행 업데이트 완료시 실행됨.
            console.log("onRowUpdated: ", data);
          }}
          onRowUpdating={data => {
            // Table 전체 행 업데이트 중 실행됨. 
            // newData와 oldData를 제공해줌.
            // 저장 클릭 시 해당 이벤트가 실행됨.

            console.log("onRowUpdating: ", data);
            return data;
          }}
          onEditorPrepared={data => {
            // console.log("DATA: ", data);
            return data;
          }}>
          <Selection mode="multiple" />
          <Paging 
            defaultPageSize={this.defaultPageSize} 
            pageSize={this.state.pageSize}
          />
          <Editing
            mode="batch"
            allowUpdating={true}
            allowAdding={true}
            selectTextOnEditStart={this.state.selectTextOnEditStart}
            startEditAction={this.state.startEditAction}
          />
          <Pager
            showNavigationButtons={true}
            showPageSizeSelector={true}
            // allowedPageSizes={[1, 2, 3]}
            allowedPageSizes={[]}
            infoText={
              (currentIdx, totalIdx, totalCnt) => {
                return `BKD_현재_커서_${currentIdx} / BKD_마지막_커서_${totalIdx} / BKD_전체_데이터_${totalCnt}`;
              }
            }
            showInfo={true} />
          <Export enabled={true} fileName="Employees" allowExportSelectedData={true} />
          <FilterRow visible={this.state.showFilterRow}
            applyFilter={this.state.currentFilter} />
          <HeaderFilter visible={this.state.showHeaderFilter} />
          <SearchPanel visible={true}
            width={240}
            placeholder="Search..." />
          <Column 
            dataField="OrderNumber"
            width={140}
            dataType="number"
            allowEditing={false}
            caption="Invoice Number">
            <HeaderFilter groupInterval={10000} />
          </Column>
          <Column dataField="OrderDate"
            alignment="right"
            dataType="date"
            width={120}
            calculateFilterExpression={this.calculateFilterExpression}>
            <HeaderFilter dataSource={this.orderHeaderFilter} />
          </Column>
          <Column dataField="DeliveryDate"
            alignment="right"
            dataType="datetime"
            format="M/d/yyyy, HH:mm"
            width={180} />
          <Column dataField="SaleAmount"
            alignment="right"
            dataType="number"
            format="currency"
            // hidingPriority={0}
            editorOptions={saleAmountEditorOptions}>
            <HeaderFilter dataSource={this.saleAmountHeaderFilter} />
          </Column>
          <Column dataField="Employee" />
          <Column dataField="CustomerStoreCity"
            caption="City">
            <HeaderFilter allowSearch={true} />
          </Column>
          <Summary>
            <TotalItem
              column="OrderNumber"
              summaryType="count" />
            <TotalItem
              column="OrderDate"
              summaryType="min"
              customizeText={this.customizeDate} />
            <TotalItem
              column="OrderNumber"
              // summaryType=""
              // customizeText={data => {
              //   console.log("DATA: ", data);
              //   console.log("this.state.selectedItemKeys[0];: ", this.state.selectedItemKeys);
              //   let total: number = 0;
              //   this.state.selectedItemKeys.map(currentId => {
              //     const currentData = this.orders.store()._array.find(item => {
              //       return item.ID === currentId;
              //     });
              //     // console.log("currentData: ", currentData);
              //     if(currentData && currentData.SaleAmount) {
              //       total += currentData.SaleAmount;
              //     }
              //   });
              //   return total > 0 ? `Checked: $${total}` : ``;
              // }}
              valueFormat="currency" />
          </Summary>
        </DataGrid> 
      </div>
    );
  }
  calculateFilterExpression(value, selectedFilterOperations, target) {
    let column: any = this;
    if (target === 'headerFilter' && value === 'weekends') {
      return [[getOrderDay, '=', 0], 'or', [getOrderDay, '=', 6]];
    }
    return column.defaultCalculateFilterExpression.apply(this, arguments);
  }
  orderHeaderFilter(data) {
    data.dataSource.postProcess = (results) => {
      results.push({
        text: 'Weekends',
        value: 'weekends'
      });

      return results;
    };
  } 
  onShowFilterRowChanged(e) {
    this.setState({
      showFilterRow: e.value
    });
    this.clearFilter();
  }
  onShowHeaderFilterChanged(e) {
    this.setState({
      showHeaderFilter: e.value
    });
    this.clearFilter();
  }
  onCurrentFilterChanged(e) {
    this.setState({
      currentFilter: e.value
    });
  }
  clearFilter() {
    this.dataGrid.instance.clearFilter();
  }
  changeResizingMode(data) {
    this.setState({ mode: data.value });
  }
  /**
   *  deleteRecords = () => {}
   *  
   *  - 데이터를 삭제 했을경우, 발생하는 이벤트
   */
  deleteRecords() {
    const isConfirm = window.confirm("삭제하시겠습니까?");
    console.log("삭제될 키값: ", this.state.selectedItemKeys);
    if(isConfirm) {
      this.state.selectedItemKeys.forEach((key) => {
        this.orders.store().remove(key);
      });
      this.setState({
        selectedItemKeys: []
      });
      this.orders.reload();
    } 
  }
  selectionChanged(data) {
    this.setState({
      selectedItemKeys: data.selectedRowKeys
    });
  }
   /**
   *  onSelectTextOnEditStartChanged = () => {}
   *  
   *  - StartEditAciton 속성 - 한번 클릭 / 더블클릭 중 택 1.
   */
  onSelectTextOnEditStartChanged(args) {
    this.setState({
      selectTextOnEditStart: args.value
    });
  }
  /**
   *  onStartEditActionChanged = () => {}
   *  
   *  -텍스트 변경 완료.
   */
  onStartEditActionChanged(args) {
    this.setState({
      startEditAction: args.value
    });
  }
  customizeDate(data) {
    return "";
    // return `First: ${ Globalize.formatDate(data.value, { date: 'medium' })}`;
    // return `First: ${data})}`;
  }

  /** Start New Function */

  /**
   *  onChangePageSize = () => {} 
   *  - pageSize 변경 이벤트
   */
  onChangePageSize(event: React.ChangeEvent<HTMLSelectElement>) {
    const { target: { value }} = event;
    this.setState({
      pageSize: parseInt(value)
    });
  }
  /**
   *  func toggleGridTableDetails
   *   - Grid Table을 '자세히 보기'
   */
  toggleGridTableDetails() {
    this.setState({
      isGridDetails: !this.state.isGridDetails
    });
  }
 /** End New Function */
}

function getOrderDay(rowData) {
  return (new Date(rowData.OrderDate)).getDay();
}



export default GridContainer;