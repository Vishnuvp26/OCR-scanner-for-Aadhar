interface OcrResultProps {
    data: any;
}

const OcrResult = ({ data }: OcrResultProps) => {
    if (!data) {
        return (
            <div className="rounded-lg border p-4 md:p-6 bg-gray-50">
                <h2 className="text-lg font-semibold mb-4">Extracted Details</h2>
                <p className="text-gray-500">Upload and scan Aadhar card to view details</p>
            </div>
        );
    }

    return (
        <div className="rounded-lg border p-4 md:p-6 bg-white">
            <h2 className="text-lg font-semibold mb-4">Extracted Details</h2>
            <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="text-sm text-gray-500">Name</p>
                        <p className="font-medium">{data.name}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Date of Birth</p>
                        <p className="font-medium">{data.dob}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Gender</p>
                        <p className="font-medium">{data.gender}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Aadhaar Number</p>
                        <p className="font-medium">{data.aadhaarNumber}</p>
                    </div>
                </div>
                <div>
                    <p className="text-sm text-gray-500">Address</p>
                    <p className="font-medium">{data.address}</p>
                </div>
            </div>
        </div>
    );
};

export default OcrResult;