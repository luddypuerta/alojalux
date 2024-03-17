//Libraries
import React, { useState } from 'react';
import { Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { UploadFile } from 'antd/lib/upload/interface';

//Styles
import './UploadFile.component.scss';

interface FileUploaderProps {
    onChange?: (file: UploadFile) => void;
}

const FileUploaderComponent: React.FC<FileUploaderProps> = ({ onChange }) => {
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    const beforeUpload = (file: UploadFile) => {
        const isAllowedType = validateFileType(file, ["image/jpeg", "image/png"]);
        if (!isAllowedType) {
            setFileList([]);
            message.error(`${file.name} No es un archivo de imagen válido`);
            return false;
        }
        setFileList([file]);
        if (onChange) onChange(file);
        return false;
    };

    const removeFile = () => {
        setFileList([]);
        return true;
    };

    const validateFileType = (
        { type, name }: UploadFile,
        allowedTypes?: string[]
    ) => {
        if (!allowedTypes) {
            return true;
        }

        if (type) {
            const fileExtension = name.split('.').pop()?.toLowerCase();
            if (fileExtension) {
                return allowedTypes.includes(type) || allowedTypes.includes(`image/${fileExtension}`);
            }
        }

        return false;
    };

    return (
        <Upload
            fileList={fileList}
            accept=".png,.jpg"
            beforeUpload={beforeUpload}
            onRemove={removeFile}
            className='btn-upload'
        >
            <Button icon={<UploadOutlined />}>Cargar Foto</Button>
        </Upload>
    );
};

export default FileUploaderComponent;
