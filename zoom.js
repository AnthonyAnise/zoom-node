import { Buffer } from "node:buffer";
import axios from "axios";

/**
 * Zoom Dashboards API.
 *
 * @see https://marketplace.zoom.us/docs/api-reference/zoom-api/methods/#tag/Dashboards
 */
class Dashboards {
  /**
   * Make Dashboards instance.
   *
   * @param {Zoom} client
   */
  constructor(client) {
    this.client = client;
  }

  /**
   * List total live or past meetings that occurred during a specified
   * period of time.
   *
   * @see https://marketplace.zoom.us/docs/api-reference/zoom-api/methods/#operation/meetings
   *
   * @param {Object} [params]
   *
   * @returns {Promise}
   */
  listMeetings(params = {}) {
    return this.client.withPagination(
      this.client.withTokenRefreshAttempt,
      {
        method: "GET",
        url: "/metrics/meetings",
        params,
      },
      "meetings"
    );
  }

  /**
   * List participants from live or past meetings.
   *
   * @see https://marketplace.zoom.us/docs/api-reference/zoom-api/methods/#operation/dashboardMeetingParticipants
   *
   * @param {string} meetingId
   * @param {Object} [params]
   *
   * @returns {Promise}
   */
  listMeetingParticipants(meetingId, params = {}) {
    return this.client.withPagination(
      this.client.withTokenRefreshAttempt,
      {
        method: "GET",
        url: `/metrics/meetings/${meetingId}/participants`,
        params,
      },
      "participants"
    );
  }

  /**
   * Get details on live or past meetings.
   *
   * @see https://marketplace.zoom.us/docs/api-reference/zoom-api/methods/#operation/dashboardMeetingDetail
   *
   * @param {string} meetingId
   * @param {Object} [params]
   *
   * @returns {Promise}
   */
  getMeetingDetails(meetingId, params = {}) {
    return this.client.withTokenRefreshAttempt({
      method: "GET",
      url: `/metrics/meetings/${meetingId}`,
      params,
    });
  }
}

/**
 * Zoom Groups API.
 *
 * @see https://marketplace.zoom.us/docs/api-reference/zoom-api/methods/#tag/Groups
 */
class Groups {
  /**
   * Make Groups instance.
   *
   * @param {Zoom} client
   */
  constructor(client) {
    this.client = client;
  }

  /**
   * List groups under an account.
   *
   * @see https://marketplace.zoom.us/docs/api-reference/zoom-api/methods/#operation/groups
   *
   * @returns {Promise}
   */
  listGroups() {
    return this.client.withTokenRefreshAttempt({
      method: "GET",
      url: "/groups",
    });
  }

  /**
   * Get a group under an account.
   *
   * @see https://marketplace.zoom.us/docs/api-reference/zoom-api/methods/#operation/group
   *
   * @param {string} groupId
   *
   * @returns {Promise}
   */
  getAGroup(groupId) {
    return this.client.withTokenRefreshAttempt({
      method: "GET",
      url: `/groups/${groupId}`,
    });
  }

  /**
   * List the members of a group under your account.
   *
   * @see https://marketplace.zoom.us/docs/api-reference/zoom-api/methods/#operation/groupMembers
   *
   * @param {string} groupId
   * @param {Object} [params]
   *
   * @returns {Promise}
   */
  listGroupMembers(groupId, params = {}) {
    return this.client.withPagination(
      this.client.withTokenRefreshAttempt,
      {
        method: "GET",
        url: `/groups/${groupId}/members`,
        params,
      },
      "members"
    );
  }
}

/**
 * Zoom Meetings API.
 *
 * @see https://marketplace.zoom.us/docs/api-reference/zoom-api/methods/#tag/Meetings
 */
class Meetings {
  /**
   * Make Meetings instance.
   *
   * @param {Zoom} client
   */
  constructor(client) {
    this.client = client;
  }

  /**
   * List a user's (meeting host) scheduled meetings.
   *
   * @see https://marketplace.zoom.us/docs/api-reference/zoom-api/methods/#operation/meetings
   *
   * @param {number|string|"me"} userId
   * @param {Object} [params]
   *
   * @returns {Promise}
   */
  listMeetings(userId, params = {}) {
    return this.client.withPagination(
      this.client.withTokenRefreshAttempt,
      {
        method: "GET",
        url: `/users/${userId}/meetings`,
        params,
      },
      "meetings"
    );
  }

  /**
   * Retrieve the details of a meeting.
   *
   * @see https://marketplace.zoom.us/docs/api-reference/zoom-api/methods/#operation/meeting
   *
   * @param {number} meetingId
   * @param {Object} [params]
   *
   * @returns {Promise}
   */
  getAMeeting(meetingId, params = {}) {
    return this.client.withTokenRefreshAttempt({
      method: "GET",
      url: `/meetings/${meetingId}`,
      params,
    });
  }

  /**
   * Retrieve information on participants from a past meeting.
   *
   * @see https://marketplace.zoom.us/docs/api-reference/zoom-api/methods/#operation/pastMeetingParticipants
   *
   * @param {string} meetingId
   * @param {Object} [params]
   *
   * @returns {Promise}
   */
  getPastMeetingParticipants(meetingId, params = {}) {
    return this.client.withPagination(
      this.client.withTokenRefreshAttempt,
      {
        method: "GET",
        url: `/past_meetings/${meetingId}/participants`,
        params,
      },
      "participants"
    );
  }

  /**
   * Retrieve the meeting invite note that was sent for a specific meeting.
   *
   * @see https://marketplace.zoom.us/docs/api-reference/zoom-api/methods/#operation/meetingInvitation
   *
   * @param {number} meetingId
   *
   * @returns {Promise}
   */
  getMeetingInvitation(meetingId) {
    return this.client.withTokenRefreshAttempt({
      method: "GET",
      url: `/meetings/${meetingId}/invitation`,
    });
  }

  /**
   * Create a meeting for a user.
   *
   * @see https://marketplace.zoom.us/docs/api-reference/zoom-api/methods/#operation/meetingCreate
   *
   * @param {number|string|"me"} userId
   * @param {Object} meeting
   *
   * @returns {Promise}
   */
  createAMeeting(userId, meeting) {
    return this.client.withTokenRefreshAttempt({
      method: "POST",
      url: `/users/${userId}/meetings`,
      data: meeting,
    });
  }

/**
   * Updates an existing meeting.
   *
   * @see https://developers.zoom.us/docs/api/rest/reference/zoom-api/methods/#operation/meetingUpdate
   *
   * @param {number} meetingId
   * @param {Object} meeting
   *
   * @returns {Promise}
   */
  updateMeeting(meetingId, meeting) {
    return this.client.withTokenRefreshAttempt({
      method: "PATCH",
      url: `/meetings/${meetingId}`,
      data: meeting,
    });
  }

  
  /**
   * Delete a meeting.
   *
   * @see https://marketplace.zoom.us/docs/api-reference/zoom-api/methods/#operation/meetingDelete
   *
   * @param {number} meetingId
   * @param {Object} [params]
   *
   * @returns {Promise}
   */
  deleteAMeeting(meetingId, params = {}) {
    return this.client.withTokenRefreshAttempt({
      method: "DELETE",
      url: `/meetings/${meetingId}`,
      params,
    });
  }
}

/**
 * Zoom Reports API.
 *
 * @see https://marketplace.zoom.us/docs/api-reference/zoom-api/methods/#tag/Reports
 */
class Reports {
  /**
   * Make Reports instance.
   *
   * @param {Zoom} client
   */
  constructor(client) {
    this.client = client;
  }

  /**
   * Return a report of a past meeting with two or more participants,
   * including the host.
   *
   * @see https://marketplace.zoom.us/docs/api-reference/zoom-api/methods/#operation/reportMeetingParticipants
   *
   * @param {string} meetingId
   * @param {Object} [params]
   *
   * @returns {Promise}
   */
  getMeetingParticipantReports(meetingId, params = {}) {
    return this.client.withPagination(
      this.client.withTokenRefreshAttempt,
      {
        method: "GET",
        url: `/report/meetings/${meetingId}/participants`,
        params,
      },
      "participants"
    );
  }
}

/**
 * Zoom API client.
 */
class Zoom {
  /**
   * Make new client. This is the main entry point of the package.
   *
   * @param {Object} config
   * @param {string} config.accountId
   * @param {string} config.clientId
   * @param {string} config.clientSecret
   * @param {string} [config.baseURL]
   * @param {string} [config.baseAuthURL]
   * @param {number} [config.timeout]
   */
  constructor({
    accountId,
    clientId,
    clientSecret,
    baseURL = "https://api.zoom.us/v2",
    baseAuthURL = "https://zoom.us",
    timeout = 0,
  }) {
    // Set up auth client used to obtain access tokens.
    const creds = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
    this.auth = axios.create({
      baseURL: baseAuthURL,
      params: {
        grant_type: "account_credentials",
        account_id: accountId,
      },
      headers: {
        Authorization: `Basic ${creds}`,
      },
      timeout,
    });

    // Set up API client.
    this.api = axios.create({
      baseURL,
      timeout,
    });

    // Set access token function that uses a cached response for subsequent
    // valid calls.
    this.setTokenFunc();
    // Make sure we set access token for all API requests.
    this.api.interceptors.request.use(async (conf) => {
      const resp = await this.token();
      conf.headers["Authorization"] = `Bearer ${resp.data.access_token}`;
      return conf;
    });

    /**
     * Dashboards API.
     *
     * @type {Dashboards}
     */
    this.dashboards = new Dashboards(this);
    /**
     * Groups API.
     *
     * @type {Groups}
     */
    this.groups = new Groups(this);
    /**
     * Meetings API.
     *
     * @type {Meetings}
     */
    this.meetings = new Meetings(this);
    /**
     * Reports API.
     *
     * @type {Reports}
     */
    this.reports = new Reports(this);
  }

  setTokenFunc() {
    this.token = (() => {
      let resp = null;
      return async () => {
        if (!resp) {
          resp = await this.auth.request({
            method: "POST",
            url: "/oauth/token",
          });
        }

        return resp;
      };
    })();
  }

  makeAPIRequest(conf) {
    return this.api.request(conf).then((resp) => resp.data);
  }

  // We want to write this method like this so `this` is still bound to
  // its context, even if the method is passed as an argument. E.g., see
  // `groupMembers` above.
  withTokenRefreshAttempt = (conf) => {
    return this.makeAPIRequest(conf).catch((err) => {
      if (err.response.status === 401) {
        // Try once to reset token function so that a fresh request will
        // be made (and cached) for a new access token.
        //
        // @see https://marketplace.zoom.us/docs/guides/build/server-to-server-oauth-app/
        this.setTokenFunc();
        // Retry original API request.
        return this.makeAPIRequest(conf);
      }

      throw err;
    });
  };

  withPagination(reqFunc, conf, itemsName, tokenName = "next_page_token") {
    const firstPage = reqFunc(conf);
    // This `Object.assign` augments the original request Promise returned
    // from the call to `reqFunc` to be an async iterator. The iterator
    // allows for methods using the `withPagination` method to do simple
    // pagination via something like:
    // ```js
    // for await (const member of zoom.groupMembers("xxx")) {
    //   console.log(member);
    // }
    // ```
    //
    // At the same time single page/non-paginated calls can still be made:
    // ```js
    // const firstPage = await zoom.groupMembers("xxx");
    // console.log(firstPage.data.members);
    // ```
    return Object.assign(firstPage, {
      async *[Symbol.asyncIterator]() {
        for await (const page of this.pages()) {
          for (const item of page[itemsName]) {
            yield item;
          }
        }
      },

      // This helper allows for the `for await` syntax as well, but pages
      // on the page level, e.g.,
      // ```js
      // for await (const page of zoom.groupMembers("xxx").pages()) {
      //   console.log(page.data.members);
      // }
      // ```
      async *pages() {
        let page = await firstPage;
        while (true) {
          yield page;

          page = await this._nextPage(page);
          if (!page) {
            return;
          }
        }
      },

      // Helper method to manually iterate through pages.
      nextPage: (() => {
        let page = null;
        let firstPageAwaited = false;
        return async () => {
          if (!firstPageAwaited) {
            page = await firstPage;
            firstPageAwaited = true;
            return page;
          }

          page = await firstPage._nextPage(page);
          return page;
        };
      })(),

      async _nextPage(page) {
        if (!page || !page[tokenName]) {
          return null;
        }

        return await reqFunc({
          ...conf,
          params: {
            ...(conf.params || {}),
            [tokenName]: page[tokenName],
          },
        });
      },
    });
  }
}

export default Zoom;
