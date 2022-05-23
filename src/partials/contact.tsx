import { useContext } from "react";
import { Editor } from '@tinymce/tinymce-react';
import { ContactModalContext } from "@src/contexts/contactModalContext";

export default function Contact() {
    const { modalState, setModalState } = useContext(ContactModalContext);

    return (
        <div className={(!modalState && "hidden") + " fixed top-0 left-0 z-10 w-full h-full bg-gray-700/40 overflow-auto"}>
            <div className="w-1/2 bg-white mx-auto my-20 rounded-md">
                <div className="w-full flex justify-center p-4 border-b">
                    <h3>Form Liên hệ</h3>
                    <button
                        onClick={setModalState.bind(null, false)}
                        className="bg-transparent rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                    >
                        <i className="fas fa-times text-xl text-light dark:text-dark hover:text-shade dark:hover:text-shade"></i>
                    </button>
                </div>
                <div className="p-6 space-y-6">
                    <form action="#">
                        <div className="mb-4">
                            <label htmlFor="contactName" className="block text-sm text-gray-500">Tên</label>
                            <input type="text" name="contactName" id="contactName" placeholder="Nguyễn Văn A" className="border border-fade rounded-md w-full p-2.5" required />
                        </div>
                        <div className="my-4">
                            <label htmlFor="contactEmail" className="block text-sm text-gray-500">Email</label>
                            <input type="email" name="contactEmail" id="contactEmail" className="border border-fade rounded-md w-full p-2.5" placeholder="ten@email.com" required />
                        </div>
                        <div className="my-4">
                            <label htmlFor="contactTopic" className="block text-sm text-gray-500">Chủ đề</label>
                            <input type="text" name="contactTopic" id="contactTopic" className="border border-fade rounded-md w-full p-2.5" placeholder="Chủ đề" required />
                        </div>
                        <div className="my-4">
                            <label htmlFor="contactContent" className="block text-sm text-gray-500">Nội dung</label>
                            <Editor
                                apiKey=""
                                init={{
                                    height: 160,
                                    menubar: false,
                                    plugins: [
                                        'advlist autolink lists link image charmap print preview anchor',
                                        'searchreplace visualblocks code fullscreen',
                                        'insertdatetime media table paste code help wordcount'
                                    ],
                                    toolbar: 'undo redo | formatselect | ' +
                                        'bold italic backcolor | alignleft aligncenter ' +
                                        'alignright alignjustify | bullist numlist outdent indent | ' +
                                        'removeformat',
                                }}
                            />
                        </div>
                        <div className="mt-4 flex justify-center">
                            <button type="submit" className="text-white light:bg-dark dark:bg-light hover:bg-shade dark:hover:bg-shade focus:ring-4 focus:outline-none focus:ring-fade rounded-lg px-5 py-2.5 text-center">Gửi liên hệ</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}