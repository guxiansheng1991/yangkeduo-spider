function copy(value) {
    const input = document.createElement('input');
    input.setAttribute('readonly', 'readonly');
    input.setAttribute('value', value);
    document.body.appendChild(input);
    input.select();
    input.setSelectionRange(0, 9999);
    if (document.execCommand('copy')) {
        document.execCommand('copy');
        alert('复制成功!');
    }
    document.body.removeChild(input);
}