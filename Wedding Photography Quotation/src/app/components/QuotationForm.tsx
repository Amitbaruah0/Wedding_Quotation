import { useState } from "react";
import {
  FileText,
  Camera,
  Video,
  Printer,
  Clock,
  CreditCard,
} from "lucide-react";

interface QuotationData {
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  eventDate: string;
  photographerDays: number;
  photographerCount: number;
  videographerDays: number;
  videographerCount: number;
  includeAlbum: boolean;
}

export function QuotationForm() {
  const [formData, setFormData] = useState<QuotationData>({
    clientName: "",
    clientEmail: "",
    clientPhone: "",
    eventDate: "",
    photographerDays: 1,
    photographerCount: 1,
    videographerDays: 1,
    videographerCount: 1,
    includeAlbum: false,
  });

  const RATES = {
    photographyPerDay: 10000,
    videographyPerDay: 10000,
    photographyEditing: 10000,
    videographyEditing: 10000,
    album: 8000,
    transportPerDay: 500,
  };

  const calculateTotal = () => {
    const photographyCost =
      formData.photographerDays *
      formData.photographerCount *
      RATES.photographyPerDay;
    const videographyCost =
      formData.videographerDays *
      formData.videographerCount *
      RATES.videographyPerDay;
    const totalDays = Math.max(
      formData.photographerDays,
      formData.videographerDays,
    );
    const transportCost = totalDays * RATES.transportPerDay;
    const albumCost = formData.includeAlbum ? RATES.album : 0;

    const subtotal =
      photographyCost +
      videographyCost +
      RATES.photographyEditing +
      RATES.videographyEditing +
      transportCost +
      albumCost;

    const advancePayment = Math.round(subtotal * 0.3);
    const remainingPayment = subtotal - advancePayment;

    return {
      photographyCost,
      videographyCost,
      transportCost,
      albumCost,
      subtotal,
      advancePayment,
      remainingPayment,
      totalDays,
    };
  };

  const totals = calculateTotal();

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 mb-6 print:shadow-none">
          <div className="flex items-center gap-3 mb-2">
            <Camera className="w-8 h-8 text-purple-600" />
            <h1 className="text-3xl">
              Wedding Photography & Videography
            </h1>
          </div>
          <p className="text-gray-600">
            Professional Media Services
          </p>
        </div>

        {/* Client Information */}
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 mb-6 print:shadow-none">
          <div className="flex items-center gap-2 mb-6">
            <FileText className="w-5 h-5 text-purple-600" />
            <h2 className="text-xl">Client Information</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Client Name
              </label>
              <input
                type="text"
                value={formData.clientName}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    clientName: e.target.value,
                  })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                placeholder="Enter client name"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={formData.clientEmail}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    clientEmail: e.target.value,
                  })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                placeholder="client@example.com"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                value={formData.clientPhone}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    clientPhone: e.target.value,
                  })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                placeholder="+91 XXXXX XXXXX"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Event Date
              </label>
              <input
                type="date"
                value={formData.eventDate}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    eventDate: e.target.value,
                  })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              />
            </div>
          </div>
        </div>

        {/* Service Selection */}
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 mb-6 print:shadow-none">
          <div className="flex items-center gap-2 mb-6">
            <Camera className="w-5 h-5 text-purple-600" />
            <h2 className="text-xl">Service Selection</h2>
          </div>

          <div className="space-y-6">
            {/* Photography */}
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <Camera className="w-5 h-5 text-purple-600" />
                <h3>Photography Service</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Number of Days
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formData.photographerDays}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        photographerDays:
                          parseInt(e.target.value) || 1,
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Number of Photographers
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formData.photographerCount}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        photographerCount:
                          parseInt(e.target.value) || 1,
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                  />
                </div>
                <div className="flex items-end">
                  <div className="text-sm text-gray-600">
                    <p>
                      Rs.{" "}
                      {RATES.photographyPerDay.toLocaleString()}{" "}
                      per day
                    </p>
                    <p>
                      Editing: Rs.{" "}
                      {RATES.photographyEditing.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Videography */}
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <Video className="w-5 h-5 text-purple-600" />
                <h3>Videography Service</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Number of Days
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formData.videographerDays}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        videographerDays:
                          parseInt(e.target.value) || 1,
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Number of Videographers
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formData.videographerCount}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        videographerCount:
                          parseInt(e.target.value) || 1,
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                  />
                </div>
                <div className="flex items-end">
                  <div className="text-sm text-gray-600">
                    <p>
                      Rs.{" "}
                      {RATES.videographyPerDay.toLocaleString()}{" "}
                      per day
                    </p>
                    <p>
                      Editing: Rs.{" "}
                      {RATES.videographyEditing.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Album */}
            <div className="border border-gray-200 rounded-lg p-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.includeAlbum}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      includeAlbum: e.target.checked,
                    })
                  }
                  className="w-5 h-5 text-purple-600 rounded focus:ring-2 focus:ring-purple-500"
                />
                <div className="flex-1 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Printer className="w-5 h-5 text-purple-600" />
                    <span>Photography Album (Optional)</span>
                  </div>
                  <span className="text-sm text-gray-600">
                    Rs. {RATES.album.toLocaleString()}
                  </span>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Cost Breakdown */}
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 mb-6 print:shadow-none">
          <h2 className="text-xl mb-6">Cost Breakdown</h2>

          <div className="space-y-3">
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="text-gray-600">
                Photography ({formData.photographerCount}{" "}
                photographer
                {formData.photographerCount > 1
                  ? "s"
                  : ""} × {formData.photographerDays} day
                {formData.photographerDays > 1 ? "s" : ""})
              </span>
              <span>
                Rs. {totals.photographyCost.toLocaleString()}
              </span>
            </div>

            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="text-gray-600">
                Videography ({formData.videographerCount}{" "}
                videographer
                {formData.videographerCount > 1
                  ? "s"
                  : ""} × {formData.videographerDays} day
                {formData.videographerDays > 1 ? "s" : ""})
              </span>
              <span>
                Rs. {totals.videographyCost.toLocaleString()}
              </span>
            </div>

            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="text-gray-600">
                Photography Editing
              </span>
              <span>
                Rs. {RATES.photographyEditing.toLocaleString()}
              </span>
            </div>

            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="text-gray-600">
                Videography Editing
              </span>
              <span>
                Rs. {RATES.videographyEditing.toLocaleString()}
              </span>
            </div>

            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="text-gray-600">
                Transport ({totals.totalDays} day
                {totals.totalDays > 1 ? "s" : ""})
              </span>
              <span>
                Rs. {totals.transportCost.toLocaleString()}
              </span>
            </div>

            {formData.includeAlbum && (
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="text-gray-600">
                  Photography Album
                </span>
                <span>
                  Rs. {totals.albumCost.toLocaleString()}
                </span>
              </div>
            )}

            <div className="flex justify-between py-3 mt-4 border-t-2 border-gray-300">
              <span className="text-lg">Total Amount</span>
              <span className="text-xl text-purple-600">
                Rs. {totals.subtotal.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Payment Terms */}
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 mb-6 print:shadow-none">
          <div className="flex items-center gap-2 mb-6">
            <CreditCard className="w-5 h-5 text-purple-600" />
            <h2 className="text-xl">Payment Terms</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="bg-purple-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-2">
                Advance Payment (30%)
              </p>
              <p className="text-2xl text-purple-600">
                Rs. {totals.advancePayment.toLocaleString()}
              </p>
              <p className="text-xs text-gray-500 mt-2">
                Required for booking confirmation
              </p>
            </div>

            <div className="bg-green-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-2">
                Final Payment (70%)
              </p>
              <p className="text-2xl text-green-600">
                Rs. {totals.remainingPayment.toLocaleString()}
              </p>
              <p className="text-xs text-gray-500 mt-2">
                Due on last shoot day
              </p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm text-gray-700">
            <p>
              • 30% of the total amount is needed to be paid in
              advance for the booking of the dates.
            </p>
            <p>
              • The rest of the payment is needed to be
              fulfilled on the last shoot day.
            </p>
            <p>
              • Prices mentioned above are exclusive of any
              additional custom requests.
            </p>
            <p>
              • Any extra shooting hours or services will be
              charged additionally.
            </p>
          </div>
        </div>

        {/* Deliverables */}
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 mb-6 print:shadow-none">
          <div className="flex items-center gap-2 mb-6">
            <Clock className="w-5 h-5 text-purple-600" />
            <h2 className="text-xl">Deliverables & Timeline</h2>
          </div>

          <div className="space-y-4">
            <div className="border-l-4 border-purple-600 pl-4">
              <h3 className="mb-2">Photos & Videos</h3>
              <p className="text-sm text-gray-600 mb-2">
                Expected delivery: 10 days after the last shoot
              </p>
              <p className="text-sm text-gray-700">
                Will be provided in your choice of hardware or
                software (USB Drive, Hard Drive, SSD, Google
                Drive, Mega Drive, Dropbox, etc.)
              </p>
            </div>

            {formData.includeAlbum && (
              <div className="border-l-4 border-purple-600 pl-4">
                <h3 className="mb-2">Photography Album</h3>
                <p className="text-sm text-gray-600">
                  Expected delivery: 20-25 days after the event
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Print Button */}
        <div className="flex justify-center print:hidden">
          <button
            onClick={handlePrint}
            className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2 shadow-lg"
          >
            <Printer className="w-5 h-5" />
            Print Quotation
          </button>
        </div>

        {/* Footer for Print */}
        <div className="hidden print:block mt-8 pt-6 border-t border-gray-300 text-center text-sm text-gray-600">
          <p>
            Thank you for considering our services. We look
            forward to capturing your special day!
          </p>
          <p className="mt-2">
            For any queries, please feel free to contact us.
          </p>
        </div>
      </div>
    </div>
  );
}