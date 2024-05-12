import { InvestmentData } from "@/app/lib/definitions";

export default function InvestmentsTableItem({
  investment,
}: {
  investment: InvestmentData;
}) {
  return (
    <tr>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="font-medium text-sky-500">
          {investment.presale.name}
        </div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap pl-5">
        <div className="font-medium text-sky-500">{investment.amount}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap pl-5">
        <div className="font-medium text-sky-500">{investment.tokens}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap pl-5">
        <div className="font-medium text-sky-500">{investment.txid}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap pl-5">
        <div className="font-medium text-sky-500">{investment.wallet}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap pl-5">
        <div className="font-medium text-sky-500">{investment.state}</div>
      </td>
    </tr>
  );
}
