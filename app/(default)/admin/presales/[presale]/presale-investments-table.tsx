import PresaleInvestmentsTableItem from "./presale-investments-table-item";
import { InvestmentDataTable, InvestmentData } from "@/app/lib/definitions";

export default function PresaleInvestmentsTable({
  id,
  investments,
  onDeleteInvestment,
  onUpdateInvestment,
}: {
  id : string;
  investments: InvestmentDataTable[];
  onDeleteInvestment: (id: string) => void;
  onUpdateInvestment: (id: string, investmentData: InvestmentData) => void;
}) {
  return (
    <div className="bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 relative">
      <header className="px-5 py-4">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">
          Inversiones{" "}
          <span className="text-slate-400 dark:text-slate-500 font-medium">
            ({investments.length})
          </span>
        </h2>
      </header>
      <div>
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full dark:text-slate-300">
            {/* Table header */}
            <thead className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900/20 border-t border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">EMAIL</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap pl-5">
                  <div className="font-semibold text-left">ACCIONES</div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm divide-y divide-slate-200 dark:divide-slate-700">
              {investments.map((investment) => (
                <PresaleInvestmentsTableItem
                  id= {id}
                  investment={investment}
                  onDelete={onDeleteInvestment}
                  onUpdate={onUpdateInvestment}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
