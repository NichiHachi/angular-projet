import { Injectable } from "@angular/core";
import { DateAdapter } from "@angular/material/core";
import { DateRange, MatDateRangeSelectionStrategy } from "@angular/material/datepicker";

@Injectable()
export class ThreeDayRangeSelectionStrategy<D> implements MatDateRangeSelectionStrategy<D> {
  constructor(private _dateAdapter: DateAdapter<D>) { }

  selectionFinished(date: D | null): DateRange<D> {
    return this._createThreeDayRange(date);
  }

  createPreview(activeDate: D | null): DateRange<D> {
    return this._createThreeDayRange(activeDate);
  }

  private _createThreeDayRange(date: D | null): DateRange<D> {
    if (date) {
      const start = this._dateAdapter.addCalendarDays(date, -1);
      const end = this._dateAdapter.addCalendarDays(date, 1);
      return new DateRange<D>(start, end);
    }

    return new DateRange<D>(null, null);
  }
}
