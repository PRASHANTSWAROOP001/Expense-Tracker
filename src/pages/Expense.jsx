import { useRef, useState, useMemo,useEffect } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
} from '@tanstack/react-table';

import { HiArrowTrendingUp } from 'react-icons/hi2';
import { HiArrowUpRight } from 'react-icons/hi2';
import { HiMiniArrowDownLeft } from 'react-icons/hi2';

function Expense() {
  /*
   
  getLocalTime to get local formatted specified time in format of dd-mm-yyyy Thh:mm.
  
  */

  const getLocalTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  // this is our variables

  const [income, setIncome] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [expense, setExpense] = useState([]);
  const [amount, setAmount] = useState(0);
  const [time, setTime] = useState(getLocalTime());
  const [investment, setInvestment] = useState([]);

  const description = useRef(null); // use to get data out of description input field
  const category = useRef(null); // use to get data out of category select tag

  const [options, setOptions] =
    useState(
      'expense'
    ); /* to manage different options such as exepense,investment and so on */
  const [currentData, setCurrentData] = useState([]);

  // function to handle and set different different options

  const handleOptions = (option) => {
    setOptions(option);
  };


  useEffect (()=>{
    if(options == "expense"){
      setCurrentData(expense)
    }
    else if (options == "income"){
      setCurrentData(income)
    }
    else if(options == "investment"){
      setCurrentData(investment)
    }
  },[options,expense,income,investment])

  // fucntion that adds/ records each transactions

  const addTransactions = () => {
    const desc = description.current?.value || '';

    const currentTime = getLocalTime()

    const finalTime = time !== currentTime ? time : currentTime;

    if ( time != currentTime){
      setTime(currentTime)
    }

    const transactionObj ={
      id: finalTime,
      time : finalTime,
      amount: amount,
      category : category.current.value,
      description : desc,
    }

    if (options == 'income' && amount > 0) {

      setTotalIncome((prevIncome) => prevIncome + parseFloat(amount));

      setIncome((prevIncome) =>{
        const updatedIncome =  [...prevIncome, transactionObj]
        if(options == "income"){
          setCurrentData(updatedIncome)
        }
        return updatedIncome
      });
      setAmount(0);

    } 
    else if (options == 'expense' && amount > 0) {

      setTotalIncome((prevIncome) => prevIncome - parseFloat(amount));

      setExpense((prevExpense) => {
        const updatedExpense = [...prevExpense,transactionObj]
        if(options == "expense"){
          setCurrentData(updatedExpense)
        }
        return updatedExpense; 
      })
      setAmount(0);
    }
     else if (options == 'investment' && amount > 0) {

      setTotalIncome((prevIncome) => prevIncome - parseFloat(amount));

      setInvestment((prevInvest) =>{
        const updatedInvestment = [...prevInvest,transactionObj]
        if(options == "investment"){
          setCurrentData(updatedInvestment)
        }
        return updatedInvestment;
      });

      setAmount(0);
    }
  };

  const expense_category = [
    'Grocery',
    'Food',
    'Rent',
    'Health Care',
    'Clothing',
    'Fuel',
    'Utilities',
    'Others',
    'Ride-Share',
    'Public-Transport',
    'Personal-Care',
    'Personal-Leisure',
    'Credit-Card-Payment',
  ];

  const income_category = ['Salary', 'Freelance', 'Intreset', 'Others'];

  const investment_category = [
    'Stocks',
    'Bonds',
    'Mutual-Funds',
    'SIP',
    'Others',
    'Real Estate',
  ];

  const columns = useMemo(
    () => [
      {
        Header: 'Time',
        accessorKey: 'time',
      },

      {
        Header: 'Amount',
        accessorKey: 'amount',
      },

      {
        Header: 'Category',
        accessorKey: 'category',
      },

      {
        Header: 'Description',
        accessorKey: 'description',
      },
    ],
    []
  );


  const tableInstance = useReactTable({
    columns,
    data: currentData,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      sorting: [],
      pagination: { pageSize: 10 },
    },
  });

  return (
    <div className=" w-full h-screen ">
      <div className=" w-full h-full flex flex-col  md:flex-row">
        <section className=" w-full h-full md:w-1/2 flex  justify-center mt-2 md:items-center ">

          <div className=" w-[80%] h-4/5 sm:w-[60%]  sm:h-2/3 border-2 rounded-2xl shadow-md flex flex-col items-center gap-4">
            <h6 className="text-center text-lg">New Transactions</h6>

            <input
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Amount"
              className="w-[80%] h-24 text-5xl px-2 text-center outline-none"
            />

            <div className="w-[80%] h-10 border-2 bg-gray-100 rounded-md flex">
              <button
                onClick={() => handleOptions('expense')}
                className={
                  options == 'expense'
                    ? 'w-1/3 h-full flex items-center justify-center gap-1 bg-white shadow-sm rounded-lg'
                    : 'w-1/3 h-full flex items-center justify-center gap-1'
                }
              >
                Expense <HiMiniArrowDownLeft className="text-red-400" />
              </button>
              <button
                onClick={() => handleOptions('income')}
                className={
                  options == 'income'
                    ? 'w-1/3 h-full flex items-center justify-center gap-1 bg-white shadow-sm rounded-lg'
                    : 'w-1/3 h-full flex items-center justify-center gap-1'
                }
              >
                Income <HiArrowUpRight className="text-green-400" />{' '}
              </button>
              <button
                onClick={() => handleOptions('investment')}
                className={
                  options == 'investment'
                    ? 'w-1/3 h-full flex items-center justify-center gap-1 bg-white shadow-sm rounded-lg'
                    : 'w-1/3 h-full flex items-center justify-center gap-1'
                }
              >
                Investment <HiArrowTrendingUp className="text-green-600" />{' '}
              </button>
            </div>

            <input
              type="datetime-local"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-[80%] h-10 text-center border-2 outline-none bg-gray-100 px-1 rounded-md"
            />

            <input
              type="text"
              placeholder="Description"
              ref={description}
              className="w-[80%] h-10 text-center border-2 outline-none bg-gray-100 px-1 rounded-md"
            />

            <select
              name="category"
              id="category"
              ref={category}
              className="w-[80%] h-10 border-2 rounded-lg"
            >
              {options == 'expense'
                ? expense_category.map((items) => {
                  return (
                    <option key={items} value={items}>
                      {' '}
                      {items}{' '}
                    </option>
                  );
                })
                : ''}

              {options == 'income'
                ? income_category.map((items) => {
                  return (
                    <option key={items} value={items}>
                      {' '}
                      {items}{' '}
                    </option>
                  );
                })
                : ''}

              {options == 'investment'
                ? investment_category.map((items) => {
                  return (
                    <option key={items} value={items}>
                      {' '}
                      {items}{' '}
                    </option>
                  );
                })
                : ''}
            </select>

            <button
              className="w-[80%] h-10 bg-gray-800 text-white rounded-xl hover:bg-gray-700 mb-2  "
              onClick={addTransactions}
            >
              Add Transaction
            </button>
          </div>
        </section>

        <section className=" w-full h-full md:w-1/2 flex flex-col px-2">
          <table className="w-full h-[90%]">
            <thead className="border-2">
              {tableInstance.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      onClick={header.column.getToggleSortingHandler()}
                      style={{ cursor: 'pointer' }}
                      className="uppercase w-1/4 border-2 bg-gray-400 "
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {{
                        asc: ' 🔼',
                        desc: ' 🔽',
                      }[header.column.getIsSorted()] ?? null}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            <tbody>
              {tableInstance.getRowModel().rows.map((row) => (
                <tr key={row.id} className="text-center">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className='max-h-40'>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          <div className="pagination w-full h-[10%] flex justify-between items-center" >
            <button className='px-4 py-1 bg-yellow-400 hover:bg-yellow-300 rounded-sm'
              onClick={() => tableInstance.previousPage()}
              disabled={!tableInstance.getCanPreviousPage()}
            >
              Previous
            </button>
            <span>
              Page{' '}
              <strong>
                {tableInstance.getState().pagination.pageIndex + 1} of{' '}
                {tableInstance.getPageCount()}
              </strong>{' '}
            </span>
            <button className='px-4 py-1 bg-orange-400 hover:bg-orange-300 rounded-sm'
              onClick={() => tableInstance.nextPage()}
              disabled={!tableInstance.getCanNextPage()}
            >
              Next
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Expense;
