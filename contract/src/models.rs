use crate::*;
use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::serde::{Deserialize, Serialize};
use near_sdk::{serde, AccountId};

pub type JobId = u64;

#[derive(BorshDeserialize, BorshSerialize, Serialize, Deserialize)]
#[serde(crate = "near_sdk::serde")]
pub struct JobDetail {
    pub company: String,
    pub email: String,
    pub location: Option<String>,
    pub otherskills: Option<String>,
    pub skills: String,
    pub reference: Option<String>,
    pub reference_hash: Option<Base64VecU8>,
    pub description: String,
    pub logo: Option<String>,
    pub position: String,
    pub expired: u64,
    pub salary_max: u64,
    pub salary_min: u64,
    pub salary_currency: String,
    pub bounty_amount: Option<u128>,
    pub bounty_currency: Option<String>,
    pub status: Option<i8>, // pub referrals: HashMap<AccountId, AccountId>,
}

#[derive(BorshDeserialize, BorshSerialize, Serialize, Deserialize)]
#[serde(crate = "near_sdk::serde")]
pub struct Profile {
    pub full_name: String,
    pub handler: String,
    pub bio: String,
    pub email: String,
    pub skills: Vec<String>,
    pub otherskills: Vec<String>,
    pub twitter: Option<String>,
    pub github: Option<String>,
    pub linkedin: Option<String>,
    pub website: Option<String>,
    pub country: Option<String>,
    pub is_open_for_work: bool,
    pub is_open_for_remote: bool,
    pub is_subscribe: bool,
}

#[derive(BorshDeserialize, BorshSerialize)]
pub struct Job {
    pub owner_id: AccountId,
}

//The Json token is what will be returned from view calls.
#[derive(Serialize, Deserialize)]
#[serde(crate = "near_sdk::serde")]
pub struct JsonJob {
    pub job_id: JobId,
    pub owner_id: AccountId,
    pub detail: JobDetail,
}

#[derive(Serialize, Deserialize)]
#[serde(crate = "near_sdk::serde")]
pub struct JsonProfile {
    pub owner_id: AccountId,
    pub profile: Profile,
}
