import React from 'react';
import DataGrid, { Column, FilterRow, HeaderFilter, SearchPanel, Pager, Paging, Export, Editing } from 'devextreme-react/data-grid';
import { SelectBox, CheckBox } from 'devextreme-react';
import service from './data';
import { useAppContext } from '../../Components/App/AppProvider';

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
  selectTextOnEditStart: boolean;
  startEditAction: 'click' | 'dblClick';
}
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
      startEditAction: 'dblClick'
    };

    this.defaultPageSize = 10;
    this.orders = service.getOrders();
    
    console.log("ORDERS: ", this.orders);
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
  }

  render() {
    return (
      <div>
         <div className="options">
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
        </div>
        pageCount: 
        <select onChange={this.onChangePageSize} defaultValue={this.defaultPageSize}>
          {
            this.pageIndex.map((item, key) => <option key={key} value={item}>{ item }</option> )
          }
        </select>
        <DataGrid id="gridContainer"
          ref={(ref) => this.dataGrid = ref}
          dataSource={this.orders}
          showBorders={true}>
          <Paging 
            defaultPageSize={this.defaultPageSize} 
            pageSize={this.state.pageSize}
          />
          <Editing
            mode="batch"
            allowUpdating={true}
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
          <Column dataField="OrderNumber"
            width={140}
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
            editorOptions={saleAmountEditorOptions}>
            <HeaderFilter dataSource={this.saleAmountHeaderFilter} />
          </Column>
          <Column dataField="Employee" />
          <Column dataField="CustomerStoreCity"
            caption="City">
            <HeaderFilter allowSearch={true} />
          </Column>
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
 /** End New Function */
}

function getOrderDay(rowData) {
  return (new Date(rowData.OrderDate)).getDay();
}



export default GridContainer;