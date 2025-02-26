"use client";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import Link from "next/link";


export default function DataTables() {
  const [data, setData] = useState([]);
  const [dayFilter, setDayFilter] = useState("");
  const [monthFilter, setMonthFilter] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const getmains = async () => {
      try {
        const res = await fetch("/api/mains", {
          cache: "no-cache",
        });
        if (!res.ok) {
          throw new Error("Failed to fetch");
        }

        const fetchedData = await res.json();
        console.log("Fetched Data:", fetchedData);

        if (Array.isArray(fetchedData)) {
          setData(fetchedData);
        } else if (fetchedData.mains && Array.isArray(fetchedData.mains)) {
          setData(fetchedData.mains);
        } else {
          throw new Error("Unexpected data format");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setData([]);
      }
    };

    getmains();
  }, []);

  const filteredData = data.filter((main) => {
    const mainDate = dayjs(main.createdAt);
    return (
      main.start &&
      (dayFilter === "" || mainDate.date() === parseInt(dayFilter)) &&
      (monthFilter === "" || mainDate.month() + 1 === parseInt(monthFilter))
    );
  });

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div
      dir="rtl"
      className="min-h-screen p-6 bg-gray-100 flex flex-col items-center w-full"
    >
      <h1 className="text-xl font-bold mb-4"> التأشيرات الواردة</h1>

      <div className="mb-4 flex space-x-4 ">
        <input
          type="number"
          placeholder="بحث باليوم"
          className="border p-2 rounded w-50"
          value={dayFilter}
          onChange={(e) => setDayFilter(e.target.value)}
        />
        <input
          type="number"
          placeholder="بحث بالشهر"
          className="border p-2 rounded w-50"
          value={monthFilter}
          onChange={(e) => setMonthFilter(e.target.value)}
        />
      </div>

      <div className="w-full  bg-white shadow-md rounded-lg ">
        <table className="w-full table table-zebra	  border-separate border border-gray-400">
          <thead className="bg-gray-200 ">
            <tr>
              <th className="p-0 w-20 text-center ">م</th>
              <th className="p-1 w-36 text-center">عنوان</th>
              <th className="p-1 w-36 text-center">مستند أو صورة</th>
              <th className="p-1 w-36 text-center">التأشيرة </th>
              <th className="p-1 text-center"> الاجراءات</th>
              <th className="p-1 text-center"> الحالة</th>
              <th className="p-1 text-center">تاشيره2</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-300">
            {paginatedData.map((main) => (
              <tr
                key={main.id || main._id}
                className="border-t divide-y divide-gray-300 text-sm w-8"
              >
                <td className=" bg-slate-200 text-xs">
                  {paginatedData.indexOf(main) + 1}
                  <div className=" text-blue-800">
                    {main.createdAt.slice(0, 10)}
                  </div>
                </td>
                <td className="p-1 flex flex-col justify-start items-center bg-blue-200 rounded-md text-center ">
                  {main.tit}
                  <button
                    className="btn-primary btn-md	"
                    onClick={() =>
                      document.getElementById("my_modal_5").showModal()
                    }
                  >
                    ملخص الموضوع
                  </button>
                  <dialog
                    id="my_modal_5"
                    className="modal modal-bottom sm:modal-middle"
                  >
                    <div className="modal-box">
                      <h3 className="font-bold text-lg">ملخص الموضوع</h3>

                      <div className="modal-action  min-w-500">
                        <form method="dialog">
                          {main.summ}
                          <button className="btn bg-teal-500 bg-red-500! flex items-center gap-2 justify-center">
                            Close
                          </button>
                        </form>
                      </div>
                    </div>
                  </dialog>
                </td>

                <td className="p-3 text-center  ">
                  <button
                    className="btn-primary flex items-center gap-2 justify-center"
                    onClick={() =>
                      document.getElementById("my_modal_4").showModal()
                    }> عرض المستند </button>
                  <dialog id="my_modal_4" className="modal">
                    <div className="modal-box w-full">
                      <h3 className="font-bold text-lg">المستند </h3>
                      {main.files && main.files.base64 ? (
                        main.files.type === "application/pdf" ? (
                          <>
                            <embed
                              src={main.files.base64}
                              type="application/pdf"
                              width="450px"
                              height="600px"
                            />
                          </>
                        ) : (
                          <img
                            src={main.files.base64}
                            alt={main.files.name}
                            className=" object-cover rounded"
                          />
                        )
                      ) : (
                        "No file"
                      )}
                      {main.image ? (
                        <img
                          src={main.image}
                          alt={main.sort}
                          className="w-16 h-16 object-cover rounded hover:scale-150"
                        />
                      ) : (
                        "----"
                      )}{" "}
                      <div className="modal-action">
                        <form method="dialog">
                          <button className="btn-primary flex items-center gap-2 justify-center">
                            Close
                          </button>
                        </form>
                      </div>
                    </div>
                  </dialog>
                </td>
                <td className="p-3 bg-teal-100 text-teal-900 font-bold min-w-full rounded-lg  ">
                  {main.tash}
                  {main.tash2}
                  {main.tash3}
                </td>

             
                <td className="p-3 flex flex-row justify-evenly items-center gap-2 ">
                  <Link href={`/dashboard/editMains/${main._id}`}>
                                <button className="btn btn-primary">إضافة رد و مستند</button>
                            </Link>
                            <div className="flex flex-col justify-between items-center">

                                {main.comment}
                  {main.imagex && <img src={main.imagex} alt="Preview" width={50} height={100} priority="true"  />}
                  
                            </div>
                
                  </td>


                {/*
                  <td className="p-3">
                {main.filesx && main.filesx.base64 ? (
    main.filesx.type === "application/pdf" ? (
      <embed
        src={main.filesx.base64}
        type="application/pdf"
        width="300px"
        height="400px"
      />
    ) : (
      <img src={main.filesx.base64} alt={main.filesx.name} className="w-16 h-16 object-cover rounded" />
    )
  ) : (
    "No file"
  )}



                </td>
                
                */}
              
                <td className="p-3">
{(main.imagex || main.comment) ? <div className="bg-teal-500 p-1 text-slate-50 rounded-md text-center">تم الــرد</div>:<div className="bg-pink-600 p-1 text-slate-50 rounded-md text-center">جاري الــرد</div>}

                </td>
                <td className="p-3">---</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex items-center space-x-2">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          className="px-6 py-1 bg-blue-500 text-white rounded"
        >
          السابق
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          className="px-6 py-1 bg-blue-500 text-white rounded"
        >
          التالي
        </button>
        <select
          value={rowsPerPage}
          onChange={(e) => setRowsPerPage(parseInt(e.target.value))}
          className="border p-2 rounded"
        >
          <option value={5}>5 rows</option>
          <option value={10}>10 rows</option>
          <option value={15}>15 rows</option>
        </select>
      </div>
    </div>
  );
}
