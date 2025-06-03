import { uploadAdhar } from "@/api/axios";
import SubmitButton from "@/components/button/SubmitButton";
import OcrResult from "@/components/ocr/OcrResult";
import { Label } from "@/components/ui/label";
import { Loader2, Scan, UploadCloud, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const Homepage = () => {
    const [frontImage, setFrontImage] = useState<string | null>(null);
    const [backImage, setBackImage] = useState<string | null>(null);
    const [ocrData, setOcrData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [frontFile, setFrontFile] = useState<File | null>(null);
    const [backFile, setBackFile] = useState<File | null>(null);

    const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/jpg'];

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, side: 'front' | 'back') => {
        const file = e.target.files?.[0];
        if (file) {
            if (!ALLOWED_FILE_TYPES.includes(file.type)) {
                toast.error('Please upload only image files (JPG, JPEG, PNG)');
                e.target.value = '';
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                if (side === 'front') {
                    setFrontImage(reader.result as string);
                    setFrontFile(file);
                } else {
                    setBackImage(reader.result as string);
                    setBackFile(file);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveImage = (side: 'front' | 'back') => {
        if (side === 'front') {
            setFrontImage(null);
            setFrontFile(null);
        } else {
            setBackImage(null);
            setBackFile(null);
        }
    };

    const handleScan = async () => {
        if (!frontFile || !backFile) {
            return toast.error('Upload both images')
        }

        try {
            setIsLoading(true);
            const result = await uploadAdhar(frontFile, backFile);
            setOcrData(result);
        } catch (error: any) {
            const message = error?.error || error?.message || "Upload failed";
            toast.error(message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-4 md:p-6">
            <h2 className="text-2xl font-bold text-center mb-6">Aadhar Card OCR</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Section */}
                <div className="space-y-6">
                    <div className="rounded-lg border border-dashed p-4 md:p-6 space-y-4 bg-gray-100">
                        <Label className="text-lg font-semibold">Upload front side of Aadhar</Label>
                        <div className="relative">
                            <input
                                type="file"
                                className="hidden"
                                id="front-upload"
                                accept="image/*"
                                onChange={(e) => handleImageUpload(e, 'front')}
                            />
                            {!frontImage ? (
                                <label
                                    htmlFor="front-upload"
                                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                                >
                                    <UploadCloud className="w-8 h-8 text-gray-500 mb-2" />
                                    <p className="text-sm text-gray-500">Click to upload front side</p>
                                </label>
                            ) : (
                                <div className="relative">
                                    <button
                                        onClick={() => handleRemoveImage('front')}
                                        className="absolute -top-2 -right-2 p-1 bg-red-500 rounded-full text-white hover:bg-red-600 z-10"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                    <img src={frontImage} alt="Front Preview" className="max-h-48 rounded-lg mx-auto" />
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="rounded-lg border border-dashed p-4 md:p-6 space-y-4 bg-gray-100">
                        <Label className="text-lg font-semibold">Upload back side of Aadhar</Label>
                        <div className="relative">
                            <input
                                type="file"
                                className="hidden"
                                id="back-upload"
                                accept="image/*"
                                onChange={(e) => handleImageUpload(e, 'back')}
                            />
                            {!backImage ? (
                                <label
                                    htmlFor="back-upload"
                                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                                >
                                    <UploadCloud className="w-8 h-8 text-gray-500 mb-2" />
                                    <p className="text-sm text-gray-500">Click to upload back side</p>
                                </label>
                            ) : (
                                <div className="relative">
                                    <button
                                        onClick={() => handleRemoveImage('back')}
                                        className="absolute -top-2 -right-2 p-1 bg-red-500 rounded-full text-white hover:bg-red-600 z-10"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                    <img src={backImage} alt="Back Preview" className="max-h-48 rounded-lg mx-auto" />
                                </div>
                            )}
                        </div>
                        <div className="flex justify-center">
                            <SubmitButton
                                onClick={handleScan}
                                size="lg"
                                className="w-full md:w-auto"
                                icon={
                                    isLoading ? (
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                    ) : (
                                        <Scan className="w-5 h-5" />
                                    )
                                }
                                isLoading={isLoading}
                            >
                                {isLoading ? 'Scanning...' : 'Scan Aadhar'}
                            </SubmitButton>
                        </div>
                    </div>
                </div>
                {/* Right Section */}
                <OcrResult data={ocrData} />
            </div>
        </div>
    );
}

export default Homepage;