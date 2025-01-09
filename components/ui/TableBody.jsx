"use client";
import { useEffect, useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiMinus } from "react-icons/fi";
import Image from "next/image";
import CustomCheckbox from "../common/Checkbox";
import TablePagination from "../common/Pagination";

const TableBody = ({ orderData, searchText, setOrderData }) => {
  const [tableData, setTableData] = useState([]);
  const [selectItem, setSelectItem] = useState([]);
  const [selectedData, setSelectedData] = useState(null);
  const handleModalOpen = (data) => {
    setSelectedData(data);
  };
  const handleSelect = (data) => {
    const selectedData = selectItem.includes(data);
    if (selectedData) {
      const filteredData = selectItem.filter((item) => item !== data);
      setSelectItem(filteredData);
    } else {
      setSelectItem((prevData) => [...prevData, data]);
    }
  };

  const handledeleteBalk = (selectItem) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#EF4444",
      cancelButtonColor: "#000000",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedOrderData = orderData?.filter(
          (order) => !selectItem.includes(order)
        );
        setOrderData(updatedOrderData);
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
        setSelectItem([]);
      }
    });
  };
  const handleDelete = (data) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#EF4444",
      cancelButtonColor: "#000000",
      confirmButtonText: "Delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setOrderData(orderData?.filter((order) => order !== data));
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };
  useEffect(() => {
    // Filter data based on currentNav and searchText
    const filteredData = orderData?.filter((data) => {
      const searchLowerCase = searchText?.toLowerCase();
      return (
        data?.customerName?.toLowerCase().includes(searchLowerCase) ||
        data?.productName?.toLowerCase().includes(searchLowerCase)
      );
    });

    setTableData(filteredData);
  }, [orderData, searchText]);

  return (
    <>
      {!tableData.length ? (
        <div className="flex justify-center font-semibold text-2xl py-20">
          <h1>No data found</h1>
        </div>
      ) : (
        <div className="w-full overflow-x-auto  rounded-md ">
          <table
            className="w-full text-center border-collapse rounded w-overflow-x-auto"
            cellSpacing="0"
          >
            <tbody>
              <tr
                className={`pb-5 h-[4.25rem] ${
                  selectItem?.length ? "bg-green-100" : "bg-slate-100"
                }  dark:bg-slate-700 text-slate-700 dark:text-slate-300`}
              >
                <th
                  scope="col"
                  className="h-16 px-6 text-sm font-medium stroke-slate-700  "
                >
                  {!selectItem?.length ? (
                    <CustomCheckbox
                      id="orderBalk"
                      checked={selectItem.length > 0}
                      onChange={() =>
                        setSelectItem(
                          selectItem.length === orderData?.length
                            ? []
                            : [...orderData]
                        )
                      }
                    />
                  ) : (
                    <FiMinus
                      className=" w-[1.1rem] cursor-pointer bg-green-400 h-[1.1rem] border-[0.1rem] border-green-400 rounded-sm text-xl font-semibold text-white"
                      onClick={() => setSelectItem([])}
                    />
                  )}
                </th>
                <th
                  scope="col"
                  className="h-16 px-6 w-32 text-sm font-medium stroke-slate-700 "
                >
                  {!selectItem?.length ? (
                    "ID"
                  ) : (
                    <h2 className="text-lg text-green-400">
                      {selectItem?.length} Select
                    </h2>
                  )}
                </th>
                <th
                  scope="col"
                  className="h-16 px-6 text-sm font-medium stroke-slate-700  "
                >
                  <p className={selectItem.length ? "invisible" : ""}>Image</p>
                </th>
                <th
                  scope="col"
                  className="h-16 px-6 text-sm font-medium stroke-slate-700  "
                >
                  <p className={selectItem.length ? "invisible" : ""}>
                    Product Name
                  </p>
                </th>
                <th
                  scope="col"
                  className="h-16 px-6 text-sm font-medium stroke-slate-700 "
                >
                  <p className={selectItem.length ? "invisible" : ""}>
                    Customer Name
                  </p>
                </th>

                <th
                  scope="col"
                  className="h-16 w-44 px-6 text-sm font-medium stroke-slate-700  "
                >
                  <p className={selectItem.length ? "invisible" : ""}>
                    {" "}
                    Ratting
                  </p>
                </th>
                <th
                  scope="col"
                  className="h-16 ml-6 px-6 text-sm font-semibold stroke-slate-700  "
                >
                  <p className={selectItem.length ? "invisible" : ""}> Date</p>
                </th>
                <th
                  scope="col"
                  className="h-16 px-6 text-sm font-semibold stroke-slate-700"
                >
                  {!selectItem?.length ? (
                    "Action"
                  ) : (
                    <div
                      className="flex justify-center"
                      onClick={() => handledeleteBalk(selectItem)}
                    >
                      <RiDeleteBin6Line className="text-2xl font-bold text-red-500 " />
                    </div>
                  )}
                </th>
              </tr>
              {tableData?.map((data, i) => {
                return (
                  <tr
                    key={i}
                    className="border-b border-slate-200 dark:border-slate-600 dark:bg-slate-800 text-slate-500 dark:text-slate-300"
                  >
                    <td className="h-16 px-6 text-sm transition duration-300 border-slate-200 stroke-slate-500 ">
                      <CustomCheckbox
                        id={data?.id}
                        checked={selectItem.includes(data)}
                        onChange={() => handleSelect(data)}
                      />
                    </td>
                    <td className="h-16  px-6 text-sm transition duration-300 border-slate-200 stroke-slate-500 ">
                      {data?.id}
                    </td>
                    <td className="h-16 px-6 text-sm transition duration-300 border-slate-200 stroke-slate-500 ">
                      <div className="flex justify-center items-center">
                        <Image
                          width={20}
                          height={20}
                          className="h-10 w-10 rounded-full"
                          alt=""
                          src={data?.image}
                        />
                      </div>
                    </td>

                    <td className="h-16  px-6 text-sm transition duration-300 border-slate-200 stroke-slate-500 ">
                      {data?.productName}
                    </td>
                    <td className="h-16 px-6 text-sm transition duration-300 border-slate-200 stroke-slate-500 ">
                      {data?.customerName}
                    </td>
                    <td className="h-16  px-6 text-sm transition duration-300 border-slate-200 stroke-slate-500 ">
                      ttt
                    </td>
                    <td className="h-16 flex justify-center items-center  px-6 text-center text-sm transition duration-300 border-slate-200 stroke-slate-50">
                      <p>{data?.date}</p>
                    </td>

                    <td className="h-16 px-6 text-xl transition duration-300 border-slate-200 stroke-slate-500 relative">
                      <div className="flex gap-4 items-center justify-center">
                        <div>
                          <button
                            className="cursor-pointer"
                            onClick={() => handleModalOpen(data)}
                          >
                            <AiOutlineEye />
                          </button>
                        </div>
                        <div>
                          <button
                            className="cursor-pointer"
                            onClick={() => handleDelete(data)}
                          >
                            <RiDeleteBin6Line />
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="py-3">
            <TablePagination
              brandData={orderData}
              setTableData={setTableData}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default TableBody;
