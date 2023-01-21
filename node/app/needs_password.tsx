export function needs_password(session){
    if(session.type == "connection_key" || session.type == "session_key"){
        return false;
    }
    return true;
}
