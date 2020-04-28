<template>
  <div>
    <div class="modal-overlay"/>
    <div class="modal">
      <form class="modal-dialog" @submit.prevent="saveExpense">
        <!-- title -->
        <div class="modal-title">
          <p>Expense</p>
        </div>
        <!-- body -->
        <div class="modal-body">
          <div class="form-group">
            <label class="section-label">Job Information</label>
            <select
              class="form-control"
              v-model="selectedJob"
            >
              <option value="">Select a job</option>
              <option
                v-for="job in jobs"
                :key="job._id"
                :value="job._id"
              >
                {{ job.company }} - {{ job.jobTitle }}
              </option>
            </select>
            <div class="form-error" v-if="validations.selectedJob">Job selection is required</div>
          </div>
          <!-- expense info: expense, cost, store name, expense type, expenseDate -->
          <div class="form-group">
            <label class="section-label">Expense Information</label>
            <input
              class="form-control"
              v-model="expense"
              type="text"
              placeholder="Expense Title"
            >
            <div class="form-error" v-if="validations.expense">Expense title is required</div>
            <input
              class="form-control"
              v-model="cost"
              type="number"
              step=".01"
              placeholder="Expense Cost"
            >
            <div class="form-error" v-if="validations.cost">Expense cost is required</div>
            <input
              class="form-control"
              v-model="storeName"
              type="text"
              placeholder="Store Name"
            >
            <select
              class="form-control"
              v-model="expenseType"
            >
              <option
                v-if="!expenseEntry"
                :value="undefined"
              >Select expense type</option>
              <option value="benefits">Benefits</option>
              <option value="grocery">Grocery</option>
              <option value="hardware">Hardware</option>
              <option value="meals">Meals</option>
              <option value="office supplies">Office Supplies</option>
              <option value="other">Other</option>
              <option value="travel">Travel</option>
              <option value="utilities">Utilities</option>
            </select>
            <date-picker
              v-model="expenseDate"
              class="date-picker"
              placeholder="Select date of expense"
            />
          </div>
          <div class="form-group">
            <div class="inline-icon icon-button" @click="showAddress = !showAddress">
              <label class="section-label icon-button">Address</label>
              <i class="material-icons">
                {{showAddress ? 'expand_less' : 'expand_more' }}
              </i>
            </div>
            <div v-if="showAddress">
              <input
                class="form-control"
                v-model="street"
                type="text"
                placeholder="Street Address"
              >
              <input
                class="form-control"
                v-model="city"
                type="text"
                placeholder="City"
              >
              <select
                class="form-control"
                v-model="state"
              >
                <option value=''>Select State</option>
                <option value='AL'>Alabama</option>
                <option value='AK'>Alaska</option>
                <option value='AZ'>Arizona</option>
                <option value='AR'>Arkansas</option>
                <option value='CA'>California</option>
                <option value='CO'>Colorado</option>
                <option value='CT'>Connecticut</option>
                <option value='DE'>Delaware</option>
                <option value='DC'>District Of Columbia</option>
                <option value='FL'>Florida</option>
                <option value='GA'>Georgia</option>
                <option value='HI'>Hawaii</option>
                <option value='ID'>Idaho</option>
                <option value='IL'>Illinois</option>
                <option value='IN'>Indiana</option>
                <option value='IA'>Iowa</option>
                <option value='KS'>Kansas</option>
                <option value='KY'>Kentucky</option>
                <option value='LA'>Louisiana</option>
                <option value='ME'>Maine</option>
                <option value='MD'>Maryland</option>
                <option value='MA'>Massachusetts</option>
                <option value='MI'>Michigan</option>
                <option value='MN'>Minnesota</option>
                <option value='MS'>Mississippi</option>
                <option value='MO'>Missouri</option>
                <option value='MT'>Montana</option>
                <option value='NE'>Nebraska</option>
                <option value='NV'>Nevada</option>
                <option value='NH'>New Hampshire</option>
                <option value='NJ'>New Jersey</option>
                <option value='NM'>New Mexico</option>
                <option value='NY'>New York</option>
                <option value='NC'>North Carolina</option>
                <option value='ND'>North Dakota</option>
                <option value='OH'>Ohio</option>
                <option value='OK'>Oklahoma</option>
                <option value='OR'>Oregon</option>
                <option value='PA'>Pennsylvania</option>
                <option value='RI'>Rhode Island</option>
                <option value='SC'>South Carolina</option>
                <option value='SD'>South Dakota</option>
                <option value='TN'>Tennessee</option>
                <option value='TX'>Texas</option>
                <option value='UT'>Utah</option>
                <option value='VT'>Vermont</option>
                <option value='VA'>Virginia</option>
                <option value='WA'>Washington</option>
                <option value='WV'>West Virginia</option>
                <option value='WI'>Wisconsin</option>
                <option value='WY'>Wyoming</option>
                <option value='AS'>American Samoa</option>
                <option value='GU'>Guam</option>
                <option value='MP'>Northern Mariana Islands</option>
                <option value='PR'>Puerto Rico</option>
                <option value='UM'>
                  United States Minor Outlying Islands
                </option>
                <option value='VI'>Virgin Islands</option>
              </select>
              <select
                class="form-control"
                v-model="country"
              >
                <option value=''>Select Country</option>
                <option value='US'>United States</option>
                <option value='AF'>Afghanistan</option>
                <option value='AX'>Åland Islands</option>
                <option value='AL'>Albania</option>
                <option value='DZ'>Algeria</option>
                <option value='AS'>American Samoa</option>
                <option value='AD'>Andorra</option>
                <option value='AO'>Angola</option>
                <option value='AI'>Anguilla</option>
                <option value='AQ'>Antarctica</option>
                <option value='AG'>Antigua and Barbuda</option>
                <option value='AR'>Argentina</option>
                <option value='AM'>Armenia</option>
                <option value='AW'>Aruba</option>
                <option value='AU'>Australia</option>
                <option value='AT'>Austria</option>
                <option value='AZ'>Azerbaijan</option>
                <option value='BS'>Bahamas</option>
                <option value='BH'>Bahrain</option>
                <option value='BD'>Bangladesh</option>
                <option value='BB'>Barbados</option>
                <option value='BY'>Belarus</option>
                <option value='BE'>Belgium</option>
                <option value='BZ'>Belize</option>
                <option value='BJ'>Benin</option>
                <option value='BM'>Bermuda</option>
                <option value='BT'>Bhutan</option>
                <option value='BO'>Bolivia, Plurinational State of</option>
                <option value='BQ'>Bonaire, Sint Eustatius and Saba</option>
                <option value='BA'>Bosnia and Herzegovina</option>
                <option value='BW'>Botswana</option>
                <option value='BV'>Bouvet Island</option>
                <option value='BR'>Brazil</option>
                <option value='IO'>British Indian Ocean Territory</option>
                <option value='BN'>Brunei Darussalam</option>
                <option value='BG'>Bulgaria</option>
                <option value='BF'>Burkina Faso</option>
                <option value='BI'>Burundi</option>
                <option value='KH'>Cambodia</option>
                <option value='CM'>Cameroon</option>
                <option value='CA'>Canada</option>
                <option value='CV'>Cape Verde</option>
                <option value='KY'>Cayman Islands</option>
                <option value='CF'>Central African Republic</option>
                <option value='TD'>Chad</option>
                <option value='CL'>Chile</option>
                <option value='CN'>China</option>
                <option value='CX'>Christmas Island</option>
                <option value='CC'>Cocos (Keeling) Islands</option>
                <option value='CO'>Colombia</option>
                <option value='KM'>Comoros</option>
                <option value='CG'>Congo</option>
                <option value='CD'>
                  Congo, the Democratic Republic of the
                </option>
                <option value='CK'>Cook Islands</option>
                <option value='CR'>Costa Rica</option>
                <option value='CI'>Côte d'Ivoire</option>
                <option value='HR'>Croatia</option>
                <option value='CU'>Cuba</option>
                <option value='CW'>Curaçao</option>
                <option value='CY'>Cyprus</option>
                <option value='CZ'>Czech Republic</option>
                <option value='DK'>Denmark</option>
                <option value='DJ'>Djibouti</option>
                <option value='DM'>Dominica</option>
                <option value='DO'>Dominican Republic</option>
                <option value='EC'>Ecuador</option>
                <option value='EG'>Egypt</option>
                <option value='SV'>El Salvador</option>
                <option value='GQ'>Equatorial Guinea</option>
                <option value='ER'>Eritrea</option>
                <option value='EE'>Estonia</option>
                <option value='ET'>Ethiopia</option>
                <option value='FK'>Falkland Islands (Malvinas)</option>
                <option value='FO'>Faroe Islands</option>
                <option value='FJ'>Fiji</option>
                <option value='FI'>Finland</option>
                <option value='FR'>France</option>
                <option value='GF'>French Guiana</option>
                <option value='PF'>French Polynesia</option>
                <option value='TF'>French Southern Territories</option>
                <option value='GA'>Gabon</option>
                <option value='GM'>Gambia</option>
                <option value='GE'>Georgia</option>
                <option value='DE'>Germany</option>
                <option value='GH'>Ghana</option>
                <option value='GI'>Gibraltar</option>
                <option value='GR'>Greece</option>
                <option value='GL'>Greenland</option>
                <option value='GD'>Grenada</option>
                <option value='GP'>Guadeloupe</option>
                <option value='GU'>Guam</option>
                <option value='GT'>Guatemala</option>
                <option value='GG'>Guernsey</option>
                <option value='GN'>Guinea</option>
                <option value='GW'>Guinea-Bissau</option>
                <option value='GY'>Guyana</option>
                <option value='HT'>Haiti</option>
                <option value='HM'>
                  Heard Island and McDonald Islands
                </option>
                <option value='VA'>Holy See (Vatican City State)</option>
                <option value='HN'>Honduras</option>
                <option value='HK'>Hong Kong</option>
                <option value='HU'>Hungary</option>
                <option value='IS'>Iceland</option>
                <option value='IN'>India</option>
                <option value='ID'>Indonesia</option>
                <option value='IR'>Iran, Islamic Republic of</option>
                <option value='IQ'>Iraq</option>
                <option value='IE'>Ireland</option>
                <option value='IM'>Isle of Man</option>
                <option value='IL'>Israel</option>
                <option value='IT'>Italy</option>
                <option value='JM'>Jamaica</option>
                <option value='JP'>Japan</option>
                <option value='JE'>Jersey</option>
                <option value='JO'>Jordan</option>
                <option value='KZ'>Kazakhstan</option>
                <option value='KE'>Kenya</option>
                <option value='KI'>Kiribati</option>
                <option value='KP'>
                  Korea, Democratic People's Republic of
                </option>
                <option value='KR'>Korea, Republic of</option>
                <option value='KW'>Kuwait</option>
                <option value='KG'>Kyrgyzstan</option>
                <option value='LA'>Lao People's Democratic Republic</option>
                <option value='LV'>Latvia</option>
                <option value='LB'>Lebanon</option>
                <option value='LS'>Lesotho</option>
                <option value='LR'>Liberia</option>
                <option value='LY'>Libya</option>
                <option value='LI'>Liechtenstein</option>
                <option value='LT'>Lithuania</option>
                <option value='LU'>Luxembourg</option>
                <option value='MO'>Macao</option>
                <option value='MK'>
                  Macedonia, the former Yugoslav Republic of
                </option>
                <option value='MG'>Madagascar</option>
                <option value='MW'>Malawi</option>
                <option value='MY'>Malaysia</option>
                <option value='MV'>Maldives</option>
                <option value='ML'>Mali</option>
                <option value='MT'>Malta</option>
                <option value='MH'>Marshall Islands</option>
                <option value='MQ'>Martinique</option>
                <option value='MR'>Mauritania</option>
                <option value='MU'>Mauritius</option>
                <option value='YT'>Mayotte</option>
                <option value='MX'>Mexico</option>
                <option value='FM'>Micronesia, Federated States of</option>
                <option value='MD'>Moldova, Republic of</option>
                <option value='MC'>Monaco</option>
                <option value='MN'>Mongolia</option>
                <option value='ME'>Montenegro</option>
                <option value='MS'>Montserrat</option>
                <option value='MA'>Morocco</option>
                <option value='MZ'>Mozambique</option>
                <option value='MM'>Myanmar</option>
                <option value='NA'>Namibia</option>
                <option value='NR'>Nauru</option>
                <option value='NP'>Nepal</option>
                <option value='NL'>Netherlands</option>
                <option value='NC'>New Caledonia</option>
                <option value='NZ'>New Zealand</option>
                <option value='NI'>Nicaragua</option>
                <option value='NE'>Niger</option>
                <option value='NG'>Nigeria</option>
                <option value='NU'>Niue</option>
                <option value='NF'>Norfolk Island</option>
                <option value='MP'>Northern Mariana Islands</option>
                <option value='NO'>Norway</option>
                <option value='OM'>Oman</option>
                <option value='PK'>Pakistan</option>
                <option value='PW'>Palau</option>
                <option value='PS'>Palestinian Territory, Occupied</option>
                <option value='PA'>Panama</option>
                <option value='PG'>Papua New Guinea</option>
                <option value='PY'>Paraguay</option>
                <option value='PE'>Peru</option>
                <option value='PH'>Philippines</option>
                <option value='PN'>Pitcairn</option>
                <option value='PL'>Poland</option>
                <option value='PT'>Portugal</option>
                <option value='PR'>Puerto Rico</option>
                <option value='QA'>Qatar</option>
                <option value='RE'>Réunion</option>
                <option value='RO'>Romania</option>
                <option value='RU'>Russian Federation</option>
                <option value='RW'>Rwanda</option>
                <option value='BL'>Saint Barthélemy</option>
                <option value='SH'>
                  Saint Helena, Ascension and Tristan da Cunha
                </option>
                <option value='KN'>Saint Kitts and Nevis</option>
                <option value='LC'>Saint Lucia</option>
                <option value='MF'>Saint Martin (French part)</option>
                <option value='PM'>Saint Pierre and Miquelon</option>
                <option value='VC'>Saint Vincent and the Grenadines</option>
                <option value='WS'>Samoa</option>
                <option value='SM'>San Marino</option>
                <option value='ST'>Sao Tome and Principe</option>
                <option value='SA'>Saudi Arabia</option>
                <option value='SN'>Senegal</option>
                <option value='RS'>Serbia</option>
                <option value='SC'>Seychelles</option>
                <option value='SL'>Sierra Leone</option>
                <option value='SG'>Singapore</option>
                <option value='SX'>Sint Maarten (Dutch part)</option>
                <option value='SK'>Slovakia</option>
                <option value='SI'>Slovenia</option>
                <option value='SB'>Solomon Islands</option>
                <option value='SO'>Somalia</option>
                <option value='ZA'>South Africa</option>
                <option value='GS'>
                  South Georgia and the South Sandwich Islands
                </option>
                <option value='SS'>South Sudan</option>
                <option value='ES'>Spain</option>
                <option value='LK'>Sri Lanka</option>
                <option value='SD'>Sudan</option>
                <option value='SR'>Suriname</option>
                <option value='SJ'>Svalbard and Jan Mayen</option>
                <option value='SZ'>Swaziland</option>
                <option value='SE'>Sweden</option>
                <option value='CH'>Switzerland</option>
                <option value='SY'>Syrian Arab Republic</option>
                <option value='TW'>Taiwan, Province of China</option>
                <option value='TJ'>Tajikistan</option>
                <option value='TZ'>Tanzania, United Republic of</option>
                <option value='TH'>Thailand</option>
                <option value='TL'>Timor-Leste</option>
                <option value='TG'>Togo</option>
                <option value='TK'>Tokelau</option>
                <option value='TO'>Tonga</option>
                <option value='TT'>Trinidad and Tobago</option>
                <option value='TN'>Tunisia</option>
                <option value='TR'>Turkey</option>
                <option value='TM'>Turkmenistan</option>
                <option value='TC'>Turks and Caicos Islands</option>
                <option value='TV'>Tuvalu</option>
                <option value='UG'>Uganda</option>
                <option value='UA'>Ukraine</option>
                <option value='AE'>United Arab Emirates</option>
                <option value='GB'>United Kingdom</option>
                <option value='UM'>
                  United States Minor Outlying Islands
                </option>
                <option value='UY'>Uruguay</option>
                <option value='UZ'>Uzbekistan</option>
                <option value='VU'>Vanuatu</option>
                <option value='VE'>
                  Venezuela, Bolivarian Republic of
                </option>
                <option value='VN'>Viet Nam</option>
                <option value='VG'>Virgin Islands, British</option>
                <option value='VI'>Virgin Islands, U.S.</option>
                <option value='WF'>Wallis and Futuna</option>
                <option value='EH'>Western Sahara</option>
                <option value='YE'>Yemen</option>
                <option value='ZM'>Zambia</option>
                <option value='ZW'>Zimbabwe</option>
              </select>
              <input
                class="form-control"
                v-model="zipcode"
                type="text"
                placeholder="Zip Code"
              >
            </div>
          </div>
        </div>
        <!-- actions -->
        <div class="modal-actions">
          <button
            type="button"
            class="btn btn-outline-primary"
            @click="closeModal"
          >
            Cancel
          </button>
          <button type="submit" class="btn btn-primary">Save</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import DatePicker from 'vue2-datepicker'
import { mapActions, mapState, mapGetters } from 'vuex'
export default {
  props: {
    expenseEntry: {
      type: Object,
      default: null
    }
  },

  components: {
    DatePicker
  },

  data() {
    return {
      showAddress: false,
      id: null,
      selectedJob: '',
      expense: '',
      cost: null,
      storeName: '',
      expenseType: undefined,
      expenseDate: undefined,
      street: '',
      city: '',
      state: '',
      country: '',
      zipcode: '',
      validations: {
        selectedJob: null,
        expense: null,
        cost: null
      },
      isValid: false
    }
  },

  computed: {
    ...mapState('management', {
      jobs: state => state.jobsArray
    }),
    ...mapGetters('management', ['getJobEntryInfo'])
  },

  mounted() {
    this.getJobs()

    if (this.expenseEntry) {
      this.id = this.expenseEntry._id
      this.selectedJob = this.expenseEntry.job
      this.expense = this.expenseEntry.expense
      this.cost = this.expenseEntry.cost
      this.storeName = this.expenseEntry.storeName
      this.expenseType = this.expenseEntry.expenseType
      this.expenseDate = new Date(this.expenseEntry.expenseDate)
      this.street = this.expenseEntry.street
      this.city = this.expenseEntry.city
      this.state = this.expenseEntry.state
      this.country = this.expenseEntry.country
      this.zipcode = this.expenseEntry.zipcode
    }
  },

  methods: {
    ...mapActions('expenses', ['addExpense', 'editExpense']),
    ...mapActions('management', ['getJobs']),
    closeModal() {
      this.$router.back()
    },
    saveExpense() {
      this.validateSubmission()

      if (!this.isValid) {
        return
      }

      let jobInfo = this.getJobEntryInfo(this.selectedJob)

      let formData = {
        _id: this.id,
        job: this.selectedJob,
        company: jobInfo.company,
        jobTitle: jobInfo.jobTitle,
        expense: this.expense,
        cost: this.cost,
        storeName: this.storeName,
        expenseType: this.expenseType,
        expenseDate: this.expenseDate,
        street: this.street,
        city: this.city,
        state: this.state,
        country: this.country,
        zipcode: this.zipcode,
      }

      this.expenseEntry ? this.editExpense(formData) : this.addExpense(formData)
      this.$router.back()
    },
    validateSubmission() {
      this.validations.selectedJob = this.selectedJob ? false : true
      this.validations.expense = this.expense ? false : true
      this.validations.cost = this.cost ? false : true

      if (!this.validations.expense &&
        !this.validations.cost &&
        !this.validations.selectedJob) {
        this.isValid = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .modal-title {
    box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12) !important;
  }

  .date-picker {
    margin-bottom: 15px;
    width: 100%;
  }

  .icon-button {
    cursor: pointer;
  }

  button {
    margin-right: 10px;
  }
</style>
