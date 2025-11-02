
import { useParams } from "react-router-dom"

export default function TicketDetails(){
  const { pnr } = useParams()

  return (
    <div className="px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40 py-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-4xl font-black">Vé Điện Tử</p>
            <p className="text-gray-500">Đây là vé điện tử cho hành trình của bạn.</p>
          </div>
          <button onClick={()=>window.print()} className="h-12 px-6 rounded-lg bg-primary text-white font-bold">In vé</button>
        </div>
        <div className="bg-white dark:bg-gray-900/50 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
          <div className="p-6 bg-gray-50 dark:bg-gray-900/40 border-b border-gray-200 dark:border-gray-800">
            <p className="text-sm text-gray-500">Mã đặt chỗ (PNR)</p>
            <p className="text-3xl font-black tracking-wider">{pnr}</p>
          </div>
          <div className="p-6 space-y-4">
            <h3 className="text-lg font-bold">Chi tiết chuyến bay</h3>
            <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-800">
              <p className="text-sm text-gray-500">Thứ Ba, 25 tháng 12, 2024</p>
              <p className="text-lg font-semibold">Hồ Chí Minh (SGN) → Hà Nội (HAN)</p>
              <p className="text-gray-600 dark:text-gray-300">Cất cánh: 08:00 - Hạ cánh: 10:15 · VN240</p>
            </div>
          </div>

          <div className="p-6 border-t border-gray-200 dark:border-gray-800">
            <h3 className="text-lg font-bold mb-2">Thông tin hành khách</h3>
            <table className="w-full text-left text-sm">
              <thead className="border-b border-gray-200 dark:border-gray-800">
                <tr>
                  <th className="py-2 pr-4">Họ và tên</th>
                  <th className="py-2 pr-4">Loại</th>
                  <th className="py-2">Hành lý</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="py-2 pr-4">NGUYEN VAN A</td>
                  <td className="py-2 pr-4">Người lớn</td>
                  <td className="py-2">7kg xách tay, 23kg ký gửi</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-6 bg-gray-50 dark:bg-gray-900/40 border-t border-gray-200 dark:border-gray-800">
            <h4 className="font-bold mb-1">Lưu ý quan trọng</h4>
            <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-300 space-y-1">
              <li>Đến sân bay trước giờ bay tối thiểu 90 phút.</li>
              <li>Chuẩn bị giấy tờ tùy thân hợp lệ khi làm thủ tục.</li>
              <li>Kiểm tra lại thông tin chuyến bay trước khi di chuyển.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
