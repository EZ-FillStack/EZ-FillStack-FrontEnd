//에디터 업로드용
import clientAPI from '@/lib/axios';
import { resolvePublicImageUrl } from '@/api/images';

type Loader = { file: Promise<File> };

export function uploadAdapterPlugin(editor: any) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader: Loader) => {
        return {
            upload: async () => {
                const file = await loader.file;

                const formData = new FormData();
                formData.append('upload', file);

                const res = await clientAPI.post('/api/images/upload', formData);
                const url = resolvePublicImageUrl(res.data);

                return { default: url };
            },
            abort: () => {},
        };
    };
}