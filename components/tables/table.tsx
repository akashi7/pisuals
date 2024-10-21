import { ReactElement, useEffect, useMemo, useState, ReactNode } from 'react'
import { CellProps, Column, useTable } from 'react-table'

interface ColumnConfig<T extends object> {
  Header: string
  accessor: keyof T
  Cell?: (props: CellProps<T>) => ReactNode
}

interface Props<T extends object> {
  data: Array<T>
  loading: boolean
  columns: ColumnConfig<T>[]
  itemsPerPage?: number
}

const CustomTable = <T extends object>({
  data,
  loading,
  columns,
  itemsPerPage = 10,
}: Props<T>): ReactElement => {
  const total = Array.isArray(data) ? data.length : 0
  const totalPages = Math.ceil(total / itemsPerPage)

  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    setCurrentPage(1)
  }, [data])

  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentData = Array.isArray(data)
    ? data.slice(startIndex, endIndex)
    : []

  const memoizedColumns: Column<T>[] = useMemo(() => {
    const idColumn = {
      Header: '#',
      accessor: 'id' as keyof T,
      Cell: ({ row }: { row: { index: number } }) => (
        <span className='text-gray-500 font-bold'>
          {row.index + 1 + startIndex}.
        </span>
      ),
    }

    const hasIdColumn = columns.some((column) => column.accessor === 'id')

    return [
      ...(hasIdColumn ? [] : [idColumn]),
      ...columns.map((column) => ({
        ...column,
        accessor: column.accessor as keyof T,
      })),
    ]
  }, [startIndex, columns])

  const { getTableProps, getTableBodyProps, headerGroups, prepareRow, rows } =
    useTable<T>({
      columns: memoizedColumns,
      data: currentData,
    })

  return (
    <div className='w-full overflow-x-auto'>
      {loading ? (
        <div className='text-center'>Loading...</div>
      ) : (
        <>
          <table {...getTableProps()} className='border-collapse w-full'>
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr
                  {...headerGroup.getHeaderGroupProps()}
                  className='border-b'
                  key={headerGroup.id}
                >
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps()}
                      className='text-left p-4'
                      key={column.id}
                    >
                      {column.render('Header')}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row) => {
                prepareRow(row)
                return (
                  <tr {...row.getRowProps()} className='shadow' key={row.id}>
                    {row.cells.map((cell) => (
                      <td
                        {...cell.getCellProps()}
                        className='text-black p-4'
                        data-label={cell.column.Header}
                        key={cell.column.id}
                      >
                        {cell.render('Cell')}
                      </td>
                    ))}
                  </tr>
                )
              })}
            </tbody>
          </table>

          {total > itemsPerPage && (
            <div className='mt-4 flex justify-between items-center'>
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`px-4 py-2 ${
                  currentPage === 1 ? 'opacity-50 cursor-not-allowed ' : ''
                }`}
              >
                {'< Previous'}
              </button>
              <span>
                Page{' '}
                <strong>
                  {currentPage} of {totalPages}
                </strong>
              </span>
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className={`px-4 py-2 ${
                  currentPage === totalPages
                    ? 'opacity-50 cursor-not-allowed'
                    : ''
                }`}
              >
                {'Next >'}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default CustomTable
