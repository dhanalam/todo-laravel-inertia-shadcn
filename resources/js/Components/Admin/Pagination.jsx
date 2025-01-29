import {router} from '@inertiajs/react'
import {Button} from "@/Components/ui/button"
import React from "react";

export default function Pagination({links, limit = 2}) {


  const generatePaginationRange = () => {
    let pageNumbers = [];
    const totalPages = links.length; // Total number of pages
    const currentPageIndex = links.findIndex(link => link.active);  // Find the index of the active page

    // Calculate the range of pages before and after the current page
    const start = Math.max(2, currentPageIndex - limit + 1);
    const end = Math.min(totalPages - 1, currentPageIndex + limit + 1);

    // Always show the first page
    pageNumbers.push(1);

    // Show ellipsis if there are skipped pages before the current page
    if (start > 2) {
      pageNumbers.push("...");
    }

    // Add pages before and after the active page
    for (let i = start; i <= end; i++) {
      pageNumbers.push(i);  // Pages are 1-based
    }

    // Show ellipsis if there are skipped pages after the current page
    if (end < totalPages - 1) {
      pageNumbers.push("...");
    }

    // Always show the last page
    if (totalPages > 1) {
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  return (
    <div className='space-x-2'>
      {/* Prev Button */}
      <Button
        variant={links[0].active ? "default" : "outline"}
        size="sm"
        onClick={() => router.visit(links[0].url)}
        disabled={!links[0].url}
      >
        {"< Prev"}
      </Button>

      {/* Pagination Pages */}
      {generatePaginationRange().map((page, index) => (
        page === "..." ? (
          <Button key={index} variant="outline" size="sm" disabled>
            {"..."}
          </Button>
        ) : (
          <Button
            key={index}
            variant={links[page - 1].active ? "default" : "outline"}
            size="sm"
            onClick={() => router.visit(links[page - 1].url)}
            disabled={!links[page - 1].url}
          >
            {page}
          </Button>
        )
      ))}

      {/* Next Button */}
      <Button
        variant={links[links.length - 1].active ? "default" : "outline"}
        size="sm"
        onClick={() => router.visit(links[links.length - 1].url)}
        disabled={!links[links.length - 1].url}
      >
        {"Next >"}
      </Button>
    </div>
  );

}