import { VehicleStatsResponse } from "@/app/dashboard/page"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

const convertDate = (date: string) => {
    const dateClass = new Date(date);
    return dateClass.toLocaleString();
}

export default function VehicelStatsTable({ data }: { data: VehicleStatsResponse[] }) {
    return (
        <Table className="mt-8">
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Location</TableHead>
                    <TableHead>Car Count</TableHead>
                    <TableHead>Motorbike Count</TableHead>
                    <TableHead>Truck Count</TableHead>
                    <TableHead>Bus Count</TableHead>
                    <TableHead className="text-right">Timestamp</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((dataValue) => (
                    <TableRow key={dataValue.count_id}>
                        <TableCell className="font-medium">{dataValue.location}</TableCell>
                        <TableCell className="font-medium">{dataValue.car_count}</TableCell>
                        <TableCell className="font-medium">{dataValue.motorbike_count}</TableCell>
                        <TableCell className="font-medium">{dataValue.truck_count}</TableCell>
                        <TableCell className="font-medium">{dataValue.bus_count}</TableCell>
                        <TableCell className="text-right">{convertDate(dataValue.timestamp)}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
