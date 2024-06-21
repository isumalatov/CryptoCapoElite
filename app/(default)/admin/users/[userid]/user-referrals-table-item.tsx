import { UserData } from "@/app/lib/definitions";

export default function UserReferralsTableItem({
  id,
  referral,
}: {
  id: string;
  referral: UserData;
}) {
  return (
    <tr>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="font-medium text-xs text-sky-500">{referral.id}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="font-medium text-xs text-sky-500">{referral.name}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="font-medium text-xs text-sky-500">{referral.email}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="font-medium text-xs text-sky-500">
          {referral.telegram}
        </div>
      </td>
    </tr>
  );
}
