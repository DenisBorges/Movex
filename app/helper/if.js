export default function (props) {
    if (props.condicao == true) {
        return props.children
    } else {
        return false;
    }
}