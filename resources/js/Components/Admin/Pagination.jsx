import { router } from '@inertiajs/react';
import { Button } from "@/Components/ui/button";
import React from "react";
import { ButtonLink } from '../ButtonLink';

export default function Pagination({ data, limit = 2}) {
  const { links, last_page } = data;
  const activeLink = links.find(link => link.active);
  const currentPage = activeLink ? parseInt(activeLink.label) : 1;
  const totalPages = last_page;

  // Create a map of page numbers to their respective link objects
  const pageLinksMap = links.reduce((acc, link) => {
    const pageNumber = parseInt(link.label);
    if (!isNaN(pageNumber)) {
      acc[pageNumber] = link;
    }
    return acc;
  }, {});

  const generatePaginationRange = () => {
    if (totalPages <= 1) return [];
    const range = [];
    range.push(1);

    if (totalPages === 1) return range;

    let start = Math.max(2, currentPage - limit);
    let end = Math.min(totalPages - 1, currentPage + limit);

    if (start > 2) {
      range.push('...');
    }

    for (let i = start; i <= end; i++) {
      range.push(i);
    }

    if (end < totalPages - 1) {
      range.push('...');
    }

    if (totalPages > 1) {
      range.push(totalPages);
    }

    return range;
  };

  // Don't render if only one page exists
  if (totalPages <= 1) {
    return null;
  }

  function goToPage(url) { 
    router.prefetch(url, {preserveScroll: true, preserveState: true});
  }

  return (
    <div className='space-x-2'>
      {/* Previous Button */}
      <ButtonLink
        variant="outline"
        size="sm"
        href={links[0].url}
        disabled={!links[0].url}
      >
        {"< Prev"}
      </ButtonLink>

      {/* Generated Page Numbers */}
      {generatePaginationRange().map((page, index) => (
        page === "..." ? (
          <ButtonLink key={index} variant="outline" size="sm" disabled>
            ...
          </ButtonLink>
        ) : (
          <ButtonLink
            key={index}
            variant={pageLinksMap[page]?.active ? "default" : "outline"}
            size="sm"
            href={pageLinksMap[page]?.url}
            disabled={!pageLinksMap[page]?.url}
          >
            {page}
          </ButtonLink>
        )
      ))}

      {/* Next ButtonLink */}
      <ButtonLink
        variant="outline"
        size="sm"
        href={links[links.length - 1].url}
        disabled={!links[links.length - 1].url}
      >
        {"Next >"}
      </ButtonLink>
    </div>
  );
}