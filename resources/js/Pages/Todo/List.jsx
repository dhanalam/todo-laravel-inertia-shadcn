import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {useToast} from "@/hooks/use-toast"
import {Head, usePage} from '@inertiajs/react';
import DataTable from "@/Components/ui/data-table";
import {Plus} from "lucide-react"
import React, {useEffect} from "react";
import TitleFilter from "@/Components/Admin/Todo/Filters/TitleFilter.jsx";
import {Badge} from "@/Components/ui/badge.jsx";

export default function List({todos}) {

  const {flash} = usePage().props;
  const {toast} = useToast();

  useEffect(() => {
    if (flash.message) {
      toast({
        variant: "success",
        title: "Success",
        description: flash.message,
      })
    }
  }, [flash.message]);

  const columns = [
    {
      name: 'Title',
      key: 'title',
      sortable: true,
      filter: TitleFilter,
      classes: '',
    },
    {
      name: 'Description',
      key: 'description',
      sortable: true,
      classes: '',
      render: (row, value) => {
        return value.length > 60 ? value.substring(0, 60) + '...' : value;
      },
    },
    {
      name: 'Completed',
      key: 'completed',
      classes: '',
      sortable: true,
      render: (row) => {
        return <Badge variant={row.completed ? 'outline' : 'destructive'}>
          {row.completed ? 'Yes' : 'No'}
        </Badge>;
      },
    }
  ];

  return (
    <AuthenticatedLayout
      breadcrumb={
        {
          links: [
            {href: '/dashboard', text: 'Home'},
            {href: '/todos', text: 'Todos'}
          ],
          action: {
            link: '/todos/create',
            text: 'Create New',
            icon: Plus
          }
        }
      }
    >
      <Head title="Todo List"/>

      <div className="py-5">
        <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
          <DataTable
            name={'todos'}
            rows={todos}
            columns={columns}
            selectable={true}
            selectRoute={route('todos.get_all_ids')}
          ></DataTable>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}


