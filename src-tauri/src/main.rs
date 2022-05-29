#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

#[tauri::command]
fn add_new_task(title: String, description: String, time: String, previous_revision_time: u32) {
  use jfs::Store;
  use serde::{Deserialize, Serialize};
  let mut cfg = jfs::Config::default();
  cfg.single = true;
  #[derive(Serialize, Deserialize)]
  struct Task {
    title: String,
    description: String,
    time: String,
    previous_revision_time: u32,
  }
  let db = Store::new_with_cfg("data", cfg).unwrap();
  let task = Task {
    title: title.to_owned(),
    description: description.to_owned(),
    time: time.to_owned(),
    previous_revision_time: previous_revision_time.to_owned(),
  };
  db.save(&task).unwrap();
}

#[tauri::command]
fn remove_task(id: String) {
  use jfs::Store;
  let mut cfg = jfs::Config::default();
  cfg.single = true;
  let db = Store::new_with_cfg("data", cfg).unwrap();
  db.delete(&id).unwrap();
}

#[tauri::command]
fn update_task(
  id: String,
  title: String,
  description: String,
  time: String,
  previous_revision_time: u32,
) {
  let mut cfg = jfs::Config::default();
  cfg.single = true;
  remove_task(id);
  add_new_task(title, description, time, previous_revision_time)
}

fn main() {
  tauri::Builder::default()
    // This is where you pass in your commands
    .invoke_handler(tauri::generate_handler![
      add_new_task,
      remove_task,
      update_task
    ])
    .run(tauri::generate_context!())
    .expect("failed to run app");
}
