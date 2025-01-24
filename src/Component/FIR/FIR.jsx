import React, { useRef, useEffect } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const FIR = ({ onPDFGenerated }) => {
  const pdfRef = useRef();
  console.log(onPDFGenerated, "fir pdf");

  useEffect(() => {
    // Automatically generate the PDF when the component is rendered
    const input = pdfRef.current;
    console.log("fir pdf");

    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("FIR_Copy.pdf");

      // Notify parent that the PDF has been generated
      if (onPDFGenerated) {
        onPDFGenerated();
      }
    });
  }, [onPDFGenerated]);

  return (
    <div
      ref={pdfRef}
      style={{
        position: "relative",
        width: "210mm",
        height: "297mm",
        padding: "20px",
        background: "white",
      }}
    >
      {/* Background image */}
      <img
        src={""} // Replace with your background image path
        alt="FIR Template"
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          top: 0,
          left: 0,
          zIndex: -1,
        }}
      />
      <div style={{ padding: "30px" }}>
        <h2 style={{ textAlign: "center", color: "red" }}>F.I.R</h2>
        <p>To,</p>
        <p>
          <strong>Mr./Ms./Mrs. [Name]:</strong> I. BHAVYA
        </p>
        <p>
          Kindly note the details are being sent at Mumbai District Court for
          further legal proceedings. You need to be present on:
          <strong> 2025-01-13</strong>
        </p>
        <p>
          Challan Amount: <strong>78,980 INR</strong>
        </p>
        <p>
          FIR Number: <strong>AG56287987</strong>
        </p>
        <p>
          Approval Status: <strong>Pending by District Court</strong>
        </p>
        <p>
          Case Type: <strong>Breach of Agreement</strong>
        </p>
        <p>MH2547/2016</p>
        <p style={{ textAlign: "right" }}>
          <strong>Authorized Signature</strong>
        </p>
      </div>
    </div>
  );
};

export default FIR;
