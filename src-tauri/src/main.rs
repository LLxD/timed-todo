#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

#[tauri::command]
fn my_custom_command(invoke_message: String) {
  use ejdb::bson;
  use ejdb::{Database, DatabaseOpenMode};
  let db = Database::open_with_mode("src-tauri/db", DatabaseOpenMode::CREATE).unwrap();
  let coll = db.collection("some_collection").unwrap();
  let mut d = bson! {
      "name" => invoke_message,
      "count" => 10
  };
  let inserted_id = coll.save(&d).unwrap();

  d.insert("_id", inserted_id.clone());
  let d2 = coll.load(&inserted_id).unwrap().unwrap();
  assert_eq!(d, d2);
  println!("I was invoked from JS!");
}

fn main() {
  tauri::Builder::default()
    // This is where you pass in your commands
    .invoke_handler(tauri::generate_handler![my_custom_command])
    .run(tauri::generate_context!())
    .expect("failed to run app");
}
