import { InvestmentDataTable } from "@/app/lib/definitions";

export default function InvestmentsTableItem({
  investment,
}: {
  investment: InvestmentDataTable;
}) {

  return (
    <tr>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="font-medium text-sky-500">{investment.presale.title}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap pl-5">
        <div className="font-medium text-sky-500">{investment.txid}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap pl-5">
        <div className="font-medium text-sky-500">{investment.wallet}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap pl-5">
        <div className="font-medium text-sky-500">{investment.tokens}</div>
      </td>
    </tr>
  );
}
