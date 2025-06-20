//Replaced

//一度だけlocalstorageの中身全てのkey,valueをテキストファイルにして自動ダウンロード
function downloadLocalStorage() {
    let text = '';
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = localStorage.getItem(key);
        text += `${key}: ${value}\n`;
    }
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = '[Important]CaffeineLSBackup.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    //ローカルストレージを全削除
    localStorage.clear();
    console.log('[セキュリティ] ローカルストレージのバックアップと削除が完了しました。');
    alert('アカウントシステムとCaffeineMemo廃止に伴いローカルストレージのバックアップファイルをエクスポートしました。このファイルは再発行できませんので大切に保管して下さい。');
}
// 一度だけlocalstorageの中身全てのkey,valueをテキストファイルにして自動ダウンロード
function downloadLocalStorageOnce() {
    if (!localStorage.getItem('downloaded')) {
        downloadLocalStorage();
        localStorage.setItem('downloaded', 'true');
    }
}

// ページが読み込まれたときに実行
window.addEventListener('load', () => {
    downloadLocalStorageOnce();
});