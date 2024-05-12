import { UserData } from "@/app/lib/definitions";

export default function ReferralsTableItem({ user }: { user: UserData }) {
  return (
    <tr>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="font-medium text-sky-500">{user.name}</div>
      </td>
    </tr>
  );
}
