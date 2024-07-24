import React, { useEffect } from 'react';
import { useTranslation } from '../../common/components/LocalizationProvider';

const LayoutReport = () => {
  const t = useTranslation();

  useEffect(() => {
    const script = document.createElement('script');
    script.innerHTML = `
      $(document).ready(function () {
        $(".leftMenu span").click(function () {
          var self = $(this);
          collapseAll(function () {
            self.next().slideToggle('fast');
          });
          if (self.find("img").attr('src') == '/images/s_icon_down.png') {
            self.find("img").attr('src', '/images/s_icon_r.png');
          } else {
            self.find("img").attr('src', '/images/s_icon_down.png');
          }
        });
      });
      function collapseAll(callback) {
        var elements = $("#leftMenu ul:visible");
        if (elements.length) {
          elements.slideToggle('fast', callback);
        } else if (typeof callback == 'function') {
          callback();
        }
      }
    `;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div style={{ width: '100%', height: '100%', padding: 0, margin: 0, overflow: 'inherit', clear: 'both' }}>
      <table border="0" id="masterTwoColumn">
        <tbody>
          <tr>
            <td id="ctl00_ctl00_MainContent_HidePartner1" className="masterTwoColumnLeft" valign="top">
              <div className="leftMenuContainer">
                <div className="leftMenu">
                  <span>
                    <img
                      alt=""
                      style={{ width: '10px', height: '10px', padding: '5px 0 0 2px' }}
                      src="/images/s_icon_down.png"
                    />
                    Báo cáo tổng hợp
                  </span>
                  <ul>
                    <li>
                      <div className="float_left">
                        <img src="/Images/s_icon_baoCaoTongHop.png" alt="icon" />
                      </div>
                      <a href="/Reports/ActivitySummaryNew.aspx" id="ReportActivitySummaryNew">
                        {t('totalMonthReport')}
                      </a>
                    </li>
                    <li>
                      <div className="float_left">
                        <img src="/Images/s_icon_baoCaoTongHop.png" alt="icon" />
                      </div>
                      <a href="/Reports/ActivitySummary.aspx" id="ReportActivitySummary">
                        Báo cáo tổng hợp hoạt động
                      </a>
                    </li>
                    <li>
                      <div className="float_left">
                        <img src="/Images/s_icon_baoCaoChiTiet.png" alt="icon" />
                      </div>
                      <a href="/Reports/ActivityDetail.aspx" id="ReportActivityDetail">
                        Báo cáo chi tiết hoạt động
                      </a>
                    </li>
                    <li>
                      <div className="float_left">
                        <img src="/Images/s_icon_listCompanies.png" alt="icon" />
                      </div>
                      <a href="/Reports/Appointment/ReportAppointment.aspx" id="ReportAppointment">
                        Báo cáo lịch hẹn
                      </a>
                    </li>
                    <li>
                      <div className="float_left">
                        <img src="/images/icons/report_summary.png" alt="icon" />
                      </div>
                      <a href="/Reports/Tour/ActivitySummaryKM.aspx" id="REPORTACTIVITYSUMMARYKM">
                        Báo cáo tổng hợp km xe hoạt động
                      </a>
                    </li>
                  </ul>
                  <span>
                    <img
                      alt=""
                      style={{ width: '10px', height: '10px', padding: '5px 0 0 2px' }}
                      src="/images/s_icon_down.png"
                    />
                    Báo cáo hoạt động
                  </span>
                  <ul>
                    <li>
                      <div className="float_left">
                        <img src="/Images/s_icon_baoCaoDungDo.png" alt="icon" />
                      </div>
                      <a href="/Reports/StopM.aspx" id="ReportStop">
                        Báo cáo dừng đỗ
                      </a>
                    </li>
                    <li>
                      <div className="float_left">
                        <img src="/Images/s_icon_baoCaoBatDieuHoa.png" alt="icon" />
                      </div>
                      <a href="/Reports/ReportAirConditionerSummaries.aspx" id="ReportAirConditionerSummaries">
                        Báo cáo tổng hợp bật điều hòa
                      </a>
                    </li>
                    <li>
                      <div className="float_left">
                        <img src="/Images/s_icon_baoCaoRaVaoTram.png" alt="icon" />
                      </div>
                      <a href="/Reports/Station.aspx" id="ReportStation">
                        Báo cáo ra vào trạm
                      </a>
                    </li>
                    <li>
                      <div className="float_left">
                        <img src="/Images/s_icon_baoCaoChuyenKD.png" alt="icon" />
                      </div>
                      <a href="/Reports/ReportBusinessTrip.aspx" id="ReportBusinessTrip">
                        Báo cáo chuyến kinh doanh
                      </a>
                    </li>
                    <li>
                      <div className="float_left">
                        <img src="/Images/s_icon_baoCaoBatDieuHoa.png" alt="icon" />
                      </div>
                      <a href="/Reports/ReportAirConditioner.aspx" id="ReportAirConditioner">
                        Báo cáo bật điều hòa
                      </a>
                    </li>
                    <li>
                      <div className="float_left">
                        <img src="/Images/s_icon_baoCaoXeQuaDiemThuPhi.png" alt="icon" />
                      </div>
                      <a href="/Reports/Activity/ChargeStation.aspx" id="ReportChargeStation">
                        Báo cáo xe qua điểm thu phí
                      </a>
                    </li>
                    <li>
                      <div className="float_left">
                        <img src="/images/icons/config-icon.png" alt="icon" />
                      </div>
                      <a href="/Administration/Avis/StageFeesReport.aspx" id="StageFeesReport">
                        Thu phí đường bộ - Báo cáo phí theo chặng
                      </a>
                    </li>
                    <li>
                      <div className="float_left">
                        <img src="/Images/s_icon_baoCaoXeQuaDiemThuPhi.png" alt="icon" />
                      </div>
                      <a href="/Reports/Activity/ChargeStationFee.aspx" id="ReportChargeStationFee">
                        Báo cáo cước qua điểm thu phí
                      </a>
                    </li>
                    <li>
                      <div className="float_left">
                        <img src="/Images/reports-icon.png" alt="icon" />
                      </div>
                      <a href="/Reports/Activity/ActivitySummaryMonth.aspx" id="ReportActivitySummaryMonth">
                        Báo cáo tổng hợp hoạt động tháng
                      </a>
                    </li>
                  </ul>
                  <span>
                    <img
                      alt=""
                      style={{ width: '10px', height: '10px', padding: '5px 0 0 2px' }}
                      src="/images/s_icon_down.png"
                    />
                    Báo cáo động cơ
                  </span>
                  <ul>
                    <li>
                      <div className="float_left">
                        <img src="/images/icons/default_car.png" alt="icon" />
                      </div>
                      <a href="/Reports/Activity/Machine.aspx" id="REPORTMACHINE">
                        Báo cáo động cơ
                      </a>
                    </li>
                    <li>
                      <div className="float_left">
                        <img src="/images/icons/default_car.png" alt="icon" />
                      </div>
                      <a href="/Reports/Activity/MachineSummary.aspx" id="ReportMachineSummary">
                        Báo cáo trạng thái động cơ
                      </a>
                    </li>
                  </ul>
                  <span>
                    <img
                      alt=""
                      style={{ width: '10px', height: '10px', padding: '5px 0 0 2px' }}
                      src="/images/s_icon_down.png"
                    />
                    Báo cáo lịch trình
                  </span>
                  <ul>
                    <li>
                      <div className="float_left">
                        <img src="/Images/s_baoCaoHanhTrinh.png" alt="icon" />
                      </div>
                      <a href="/Reports/ReportItineraryM.aspx" id="ReportItinerary">
                        Báo cáo hành trình
                      </a>
                    </li>
                  </ul>
                  <span>
                    <img
                      alt=""
                      style={{ width: '10px', height: '10px', padding: '5px 0 0 2px' }}
                      src="/images/s_icon_down.png"
                    />
                    Báo cáo trạng thái
                  </span>
                  <ul>
                    <li>
                      <div className="float_left">
                        <img src="/Images/s_icon_baoCaoMoCua.png" alt="icon" />
                      </div>
                      <a href="/Reports/Door.aspx" id="ReportDoor">
                        Báo cáo mở cửa
                      </a>
                    </li>
                    <li>
                      <div className="float_left">
                        <img src="/images/icons/xe_cau.png" alt="icon" />
                      </div>
                      <a href="/Reports/Activity/ReportRescueVehicle.aspx" id="ReportRescueVehicle">
                        Báo cáo nâng hạ ben
                      </a>
                    </li>
                    <li>
                      <div className="float_left">
                        <img src="/images/icons/xe_cau.png" alt="icon" />
                      </div>
                      <a href="/Reports/Activity/DumperTruck.aspx" id="ReportTruckDumperOnOff">
                        Báo cáo nâng hạ cẩu
                      </a>
                    </li>
                  </ul>
                  <span>
                    <img
                      alt=""
                      style={{ width: '10px', height: '10px', padding: '5px 0 0 2px' }}
                      src="/images/s_icon_down.png"
                    />
                    Báo cáo hệ thống
                  </span>
                  <ul>
                    <li>
                      <div className="float_left">
                        <img src="/images/icons/bc_LoiXung.png" alt="icon" />
                      </div>
                      <a href="/Reports/Activity/PulseError.aspx" id="ReportPulseError">
                        Báo cáo lỗi xung
                      </a>
                    </li>
                    <li>
                      <div className="float_left">
                        <img src="/Images/s_icon_baoCaoMatGPS.png" alt="icon" />
                      </div>
                      <a href="/Reports/Activity/SignalLoss.aspx" id="ReportSignalLoss">
                        Báo cáo mất tín hiệu
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default LayoutReport;
