import React, {useState, useCallback, useRef} from "react"
import {Button} from "@/Components/ui/button"
import {Checkbox} from "@/components/ui/checkbox"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/Components/ui/table"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {router, usePage} from '@inertiajs/react'
import __has from 'lodash/has';
import {ChevronDown, ChevronsUpDown, ChevronUp} from "lucide-react"
import Pagination from "@/Components/Admin/Pagination.jsx";
import {getStorage, setStorage} from "@/lib/StorageManager.js";

export default function DataTable({name, rows, columns, selectable = true, selectRoute = null}) {

  const {query, url} = usePage().props;

  const [visibleColumns, setVisibleColumns] = useState(columns.map(column => __has(column, 'visible') ? column : {
    ...column,
    visible: true
  }));

  const [filters, setFilters] = useState({
    title: '',
    sortBy: null,
    sortDirection: null,
    ...query,
  });

  const selectedIdsKey = name + '_selected_ids';
  const [selectedIds, setSelectedIds] = useState(getStorage(selectedIdsKey, []));
  const resetSelectedIds = (selectedIds) => {
    setStorage(selectedIdsKey, selectedIds);
    setSelectedIds(selectedIds);
  };
  const isAllSelected = rows.total === selectedIds.length;

  function toggleChecks(id, checked) {
    if (checked) {
      resetSelectedIds([...selectedIds, id]);
    } else {
      resetSelectedIds(selectedIds.filter((selectedId) => selectedId !== id));
    }
  }

  function toggleRowChecked(checked) {
    if (checked) {
      resetSelectedIds([...selectedIds, ...rows.data.map((row) => row.id)])
    } else {
      resetSelectedIds([]);
    }
  }

  function refreshFilters(newFilters) {
    router.visit(window.location.href, {
      method: 'get',
      data: {
        ...filters,
        ...newFilters,
      },
      preserveScroll: true,
      preserveState: true,
    });
  }

  const debounce = (func, delay) => {
    const debounceRef = useRef(null);

    return (...args) => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
      debounceRef.current = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const debouncedRefreshFilters = useCallback(debounce(refreshFilters, 300), [filters]);

  function toggleSelectAll() {
    fetch(selectRoute).then((response) => response.json()).then((ids) => {
      resetSelectedIds(ids);
    });
  }

  function unselectAll() {
    resetSelectedIds([]);
  }

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              Columns <ChevronDown/>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {visibleColumns
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.key}
                    className="capitalize"
                    checked={column.visible}
                    onCheckedChange={() => {
                      const columns = visibleColumns.map(col => col.key === column.key ? {
                        ...col,
                        visible: !col.visible
                      } : col);
                      setVisibleColumns(columns);
                    }}
                  >
                    {column.name}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>

        { selectedIds.length > 0 && (<div className='text-sm'>Selected Records: {selectedIds.length}</div>)}

        <div className='flex text-sm'>
          {
            !isAllSelected && (
              <a href="#"
                 className="text-blue-600 mr-4"
                 onClick={toggleSelectAll}
              >
                Select All {rows.total > 0 ? '(' + rows.total + ')' : ''}
              </a>
            )
          }

          { selectedIds.length > 0 && (<a href="#" className="text-red-500" onClick={unselectAll}>Unselect All</a>)}
        </div>

      </div>
      <div className="rounded-md border">
      <Table className={''}>
          <TableHeader>
            <TableRow>
              {selectable ? (
                <TableHead className={'px-2'}>
                  <Checkbox
                    id="select-rows"
                    onCheckedChange={(checked) => toggleRowChecked(checked)}
                  />
                </TableHead>
              ) : ''}
              {visibleColumns.filter(column => column.visible).map((column) => {

                let SortIcon = null;
                let newDirection = null;
                if (__has(column, 'sortable') && column.sortable) {
                  const isSorted = __has(query, 'sortBy') && query.sortBy === column.key;
                  SortIcon = isSorted ? (query.sortDirection === 'asc' ? ChevronUp : (query.sortDirection === 'desc' ? ChevronDown : ChevronsUpDown)) : ChevronsUpDown;
                  newDirection = isSorted ? (query.sortDirection === 'asc' ? 'desc' : (query.sortDirection === 'desc' ? '' : 'asc')) : 'asc';
                }

                return (
                  <TableHead key={column.key} className={__has(column, 'classes') ? column.classes : ''}>
                    <div className='flex items-center'
                    >
                      {
                        !__has(column, 'sortable') && (
                          <span>{column.name}</span>
                        )
                      }
                      {__has(column, 'sortable') && column.sortable ? (
                          <a href='#'
                             className='flex items-center'
                             onClick={
                               () => refreshFilters(newDirection ? {sortBy: column.key, sortDirection: newDirection} : {})
                             }
                          >
                            <span className='mr-2'>{column.name}</span>
                            {__has(column, 'sortable') && column.sortable ? <SortIcon size={15}/> : ''}
                          </a>
                        )
                        :
                        (
                          <span>{column.name}</span>
                        )
                      }

                      {__has(column, 'filter') ?
                        <column.filter data={filters.title || ''} setData={(title) => {
                          setFilters({...filters, title: title});
                          debouncedRefreshFilters({title: title});
                        }}/> : ''}
                    </div>
                  </TableHead>
                );
              })}
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.data.length ? (
              rows.data.map((row) => (
                <TableRow key={row.id}>
                  {selectable ? (
                    <TableCell>
                      <Checkbox checked={selectedIds.includes(row.id)}
                                onCheckedChange={(checked) => toggleChecks(row.id, checked)}
                      ></Checkbox>
                    </TableCell>
                  ) : ''}
                  {visibleColumns.filter(column => column.visible).map((column) => (
                    <TableCell
                      key={row.id + column.key}>{__has(column, 'render') ? column.render(row, row[column.key]) : row[column.key]}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          Showing {rows.from} to {rows.to} of {rows.total} results
        </div>
        <Pagination links={rows.links}/>
      </div>
    </div>
  )
}
