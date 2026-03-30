import { useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { tools } from '../tools';
import { compressImage, resizeImage, cropImage, rotateImage, flipImage, addWatermark, convertFormat, imageToBase64 } from '../processors';
import TIcon from '../components/TIcon';

export default function ToolPage() {
  const { toolId } = useParams();
  const tool = tools.find(t => t.id === toolId);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  if (!tool) {
    return <div className="text-center py-16">Tool not found</div>;
  }

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target.result);
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleProcess = async () => {
    if (!file) return;
    setLoading(true);
    try {
      let result;
      switch (toolId) {
        case 'compress':
          result = await compressImage(file, 0.8);
          break;
        case 'resize':
          result = await resizeImage(file, 800, 600);
          break;
        case 'crop':
          result = await cropImage(file, 100, 100, 400, 300);
          break;
        case 'rotate':
          result = await rotateImage(file, 90);
          break;
        case 'png-jpg':
          result = await convertFormat(file, 'jpg');
          break;
        case 'base64':
          result = await imageToBase64(file);
          break;
        default:
          result = { error: 'Tool not implemented yet' };
      }
      setResult(result);
    } catch (error) {
      setResult({ error: error.message });
    }
    setLoading(false);
  };

  const handleDownload = () => {
    if (result?.blob) {
      const url = result.url;
      const a = document.createElement('a');
      a.href = url;
      a.download = `processed-image.${result.format || 'png'}`;
      a.click();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Tool Header */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="text-red-500">
              <TIcon name={tool.icon} className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">{tool.name}</h1>
              <p className="text-gray-600">{tool.description}</p>
            </div>
          </div>
        </div>

        {/* Processing Area */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="font-bold text-lg mb-4">Upload Image</h2>
            
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-red-500 hover:bg-red-50 transition-colors"
            >
              {preview ? (
                <div>
                  <img src={preview} alt="Preview" className="max-h-64 mx-auto rounded" />
                  <p className="text-sm text-gray-600 mt-4">{file?.name}</p>
                  <p className="text-xs text-gray-500">({(file?.size / 1024).toFixed(2)} KB)</p>
                </div>
              ) : (
                <div>
                  <div className="text-4xl mb-4">📁</div>
                  <p className="font-semibold mb-2">Drop your image here</p>
                  <p className="text-sm text-gray-600">or click to browse</p>
                </div>
              )}
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />

            {preview && (
              <button
                onClick={handleProcess}
                disabled={loading}
                className="w-full mt-4 bg-red-500 hover:bg-red-600 disabled:bg-gray-400 text-white font-semibold py-3 rounded-lg transition-colors"
              >
                {loading ? 'Processing...' : 'Process Image'}
              </button>
            )}
          </div>

          {/* Result Section */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="font-bold text-lg mb-4">Result</h2>
            
            {result ? (
              <div className="space-y-4">
                {result.error ? (
                  <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded">
                    {result.error}
                  </div>
                ) : (
                  <>
                    {result.url && (
                      <img src={result.url} alt="Result" className="max-h-64 mx-auto rounded border border-gray-200" />
                    )}
                    {result.base64 && (
                      <div className="bg-gray-50 p-4 rounded max-h-48 overflow-auto font-mono text-xs">
                        {result.base64.substring(0, 200)}...
                      </div>
                    )}
                    {result.blob && (
                      <div className="bg-gray-50 p-4 rounded text-sm">
                        <p>
                          Size: <span className="font-semibold">{(result.blob.size / 1024).toFixed(2)} KB</span>
                        </p>
                        {result.size && (
                          <p>
                            Original: <span className="font-semibold">{(result.size / 1024).toFixed(2)} KB</span>
                          </p>
                        )}
                      </div>
                    )}
                    {result.url && (
                      <button
                        onClick={handleDownload}
                        className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition-colors"
                      >
                        Download Result
                      </button>
                    )}
                  </>
                )}
              </div>
            ) : (
              <div className="text-center py-16 text-gray-500">
                <div className="text-4xl mb-2">⏳</div>
                <p>Process your image to see results</p>
              </div>
            )}
          </div>
        </div>

        {/* Ad Space */}
        <div className="bg-white rounded-lg shadow-sm p-8 mt-8 text-center text-gray-500 border-2 border-dashed border-gray-300">
          <p className="text-sm">Advertisement space</p>
        </div>
      </div>
    </div>
  );
}
