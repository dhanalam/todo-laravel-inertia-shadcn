import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger
} from "@/Components/ui/dropdown-menu.jsx";
import {Button} from "@/Components/ui/button.jsx";
import {Input} from "@/Components/ui/input.jsx";

import {TimerReset, FilterIcon, X, FilterXIcon} from "lucide-react";
import React from "react";

export default function TitleFilter({data, setData}) {
  return (

    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="ml-auto"
                size={'sm'}
                variant={'primary'}
        >
          { data ? <FilterIcon className="text-black"/> : <FilterIcon/> }
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end"
                           className={'p-3'}
      >
        <Input
          type="text"
          value={data}
          placeholder="Search Title"
          className={'mb-2'}
          onChange={(e) => setData(e.target.value)}
        />
        <div className="flex justify-end">
          <Button className="ml-auto"
                  size={'sm'}
                  variant={'secondary'}
                  onClick={() => setData('')}
          >
            Reset
            <X/>
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}