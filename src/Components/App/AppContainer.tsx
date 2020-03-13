import { Responsive, WidthProvider } from 'react-grid-layout';
import React, { useState, useEffect } from 'react';
import AppProvider, { useAppContext } from './AppProvider';
import TableInput from '../TableInput';
import styled from 'styled-components';
import Button from 'devextreme-react/button';
import { Switch, BrowserRouter, Router, Route, Redirect } from 'react-router-dom';
import DevExpress from '../../Routes/DevExpress';
import Sample from '../../Routes/Sample';
import ParsedHtml from '../../Routes/ParsedHtml';

const ResponsiveGridLayout = WidthProvider(Responsive);

const AppContainer = () => (
    <AppProvider>
        <AppPresenter />
    </AppProvider> 
);
const AppPresenter = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path={"/devExpress"} component={DevExpress}/>
            <Route exact path={"/sample"} component={Sample}/>
            <Route exact path={"/parsedHtml"} component={ParsedHtml}/>
            <Redirect to={"/"} from={"*"}/>
        </Switch>
    </BrowserRouter>
)

export default AppContainer;

// const useInputNumber = ({ limit, initValue }: { limit?: number, initValue: number}): IUseInputNumber => {
//     const [value, setValue] = useState<number>(initValue);

//     const onChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
//         const { target: { value }} = event;
//         const parsedValue = parseInt(value);
//         if(parsedValue) {
//             if(!isNaN(parsedValue)) { // 숫자 입력,
//                 if(!limit) { // 제한적이지 않으면,
//                     setValue(parsedValue);
//                 } else {
//                     if(parsedValue <= limit) {
//                         setValue(parsedValue);
//                     } else {
//                         alert(`최대 ${limit}개 까지 입니다.`);
//                     }
//                 }
//             } else { // 숫자가 아닌 경우,
//                 alert("숫자만 입력해주세요");
//             }
//         } else {
//             setValue(0);
//         }
//     }

//     return {
//         value,
//         onChange
//     };
// }

// const useInputString = (initValue: string): IUseInputString => {
//     const [value, setValue] = useState<string>(initValue);

//     const onChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
//         const { target: { value }} = event;
//         setValue(value);
//     }

//     return {
//         value,
//         onChange
//     };
// }

// // https://morioh.com/p/13c4c3eda92f 참고

// const useArrayInputString = ({ length, initValue }: {
//     length: number,
//     initValue: string
// }): Array<IUseInputString> => {
//     const [value, setValue] = useState<string>(initValue);
    
//     const onChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
//         const { target: { name, value }} = event;
//         setValue(value);
//     }
//     return Array.from({ length: length - 1 }, (_, key) => { return { value, onChange, name: "theadArray_" + key }});
// }

// const LimitTableColumn: number = 10;

// const AppContainer = () => {
//     const { table, handleCreateTable, handleDeleteTable } = useAppContext();
    
//     const formTitle = useInputString("");
//     const formRow = useInputNumber({ initValue: 0 });
//     const formColumn = useInputNumber({ initValue: 0, limit: LimitTableColumn });
//     // const formThead = useArrayInputString({ length: LimitTableColumn, initValue: "" });
//     const formThead = useArrayInputString({ length: LimitTableColumn , initValue: "" });
    

//     console.log("THEAD: ", formThead);


//     useEffect(() => {
//         console.log("useEffect");
//     }, [formColumn]);

//     const onCreateTable = (e) => {
//         e.preventDefault();
//         const { value: row } = formRow;
//         const { value: column } = formColumn;
//         const { value: title } = formTitle;
//         handleCreateTable({ row, column, title } as any);
//     }
 
//     const onChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
//         const { target: { name }} = event;
//         const thead = formThead.find(item => item.name === name) 
//         if(thead) {
//             console.log("HHHIHI");
//             thead.onChange(event);
//         }
     
//     }
//     useEffect(() => {
//         console.log("onChanged: ", formThead);
//     }, [onChange]);
//     return (
//         <>
//             <NavForm onSubmit={onCreateTable}>
//             <Button 
//                 text={"Click me"}
//             />
//                 Title: <InputText type={"text"} { ...formTitle } />
//                 Row:  <InputText type={"text"} { ...formRow }/>
//                 Column: <InputText type={"text"} { ...formColumn } />
//                 {/* <InputTheadBox>
//                 Thead:
//                 {
//                     formThead && formThead.map((thead, key) => 
//                         {
//                             return key < formColumn.value ? <InputText key={key} type={"text"} value={thead.value} onChange={onChange}/> : <></>
//                         }
//                     )
//                 }
                     
//                 </InputTheadBox> */}
//                 <InputButton value={"Table Create"} type={'submit'}/>
//             </NavForm>
//             <ResponsiveGridLayout 
//                 className="layout"
//                 autoSize={true} 
//                 breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
//                 cols={{lg: 12, md: 10, sm: 6, xs: 4, xxs: 2}}
//                 style={{ backgroundColor: "green" }}
//             >
//                 {/* <div key="a" data-grid={{ x: 0, y: 0, w: 1, h: 2, static: true}} style={{ backgroundColor: "Orange" }}>a</div>
//                 <div key="b" data-grid={{ x: 3, y: 3, w: 9, h: 2, isResizable: true }} style={{ backgroundColor: "Red"}}>b</div>
//                 <div key="c" data-grid={{ x: 3, y: 3, w: 3, h: 3, isDraggable: true }} style={{ backgroundColor: "green"}}>c</div> */}
//                 {/* <div key="a" data-grid={{ x: 0, y: 0, w: 9, h: 9, static: true}} /> */}
//                     {
//                         table && table.map((table, key) => 
//                             <div data-grid={{ x: 3, y: 3, w: 9, h: 2, isDraggable: true, isResizable: true }} key={key}>
//                                 <TableInput key={key} title={table.title} column={table.column} row={table.row} thArray={[]}/>
//                             </div>
//                         )
//                     }
//                 <div key={"3"} data-grid={{ x: 3, y: 3, w: 9, h: 2, isDraggable: true, isResizable: true }} style={{ backgroundColor: "red"}}></div>                
//             </ResponsiveGridLayout>
          
//             {/* <TableInput column={5} row={4} /> */}
//         </>
//     )
// };

// const NavForm = styled.form`

// `;
// const InputText = styled.input`

// `;
// const InputTheadBox = styled.div`

// `;

// const InputButton = styled.input`

// `;
// export default App;
