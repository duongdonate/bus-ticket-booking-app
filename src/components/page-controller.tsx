"use client";

import { useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";

interface PageControllerProps {
  page: number;
  totalPages: number;
  onChangePage?: (newPage: number) => void;
}

function PageController({
  page = 1,
  totalPages = 1,
  onChangePage,
}: PageControllerProps) {
  const [currentPage, setCurrentPage] = useState(page || 1);
  const [allPages, setAllPages] = useState(totalPages > 0 ? totalPages : 1);

  useEffect(() => {
    setCurrentPage(page);
    setAllPages(totalPages > 0 ? totalPages : 1);
  }, [page, totalPages]);

  useEffect(() => {
    if (onChangePage && currentPage > 0 && currentPage <= allPages) {
      onChangePage(currentPage);
    }
  }, [currentPage, onChangePage]);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleChangePage = (page: number) => {
    setCurrentPage(page);
  };

  const handleNextPage = () => {
    if (currentPage < allPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="min-w-32 h-fit flex items-center justify-between space-x-3 bg-card px-4 py-2 rounded-full mt-5">
      {/* Previous Page */}
      <Button
        variant="outline"
        className="size-10 rounded-full p-5"
        onClick={handlePreviousPage}
      >
        <ChevronLeft className="size-5" />
      </Button>
      <div className="flex items-baseline text-card-foreground text-md">
        <span>Trang</span>
        <Input
          value={currentPage}
          min={1}
          max={totalPages}
          inputMode="numeric"
          type="number"
          className="w-12 mx-2 text-center no-spinner text-md bg-transparent"
          onChange={(e) => {
            handleChangePage(Number(e.target.value));
          }}
        />
        <span className="text-md">/ {allPages}</span>
      </div>
      {/* Next Page */}
      <Button
        variant="outline"
        className="size-10 rounded-full p-5"
        onClick={handleNextPage}
      >
        <ChevronRight className="size-5" />
      </Button>
    </div>
  );
}

export default PageController;
