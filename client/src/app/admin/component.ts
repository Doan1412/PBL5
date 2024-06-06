<div className="flex flex-col pb-20 mt-16 bg-white rounded max-md:mt-10 max-md:max-w-full h-full">
                <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
                  <thead className="bg-white">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-4 font-medium text-gray-900"
                      >
                        Post ID
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-4 font-medium text-gray-900"
                      >
                        Date
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-4 font-medium text-gray-900"
                      >
                        Reporter
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-4 font-medium text-gray-900"
                      >
                        Description
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-4 font-medium text-gray-900"
                      >
                        Remove Post
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-4 font-medium text-gray-900"
                      >
                        Resovlve
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-4 font-medium text-gray-900"
                      ></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                    {reports &&
                      reports.map((report: Report, index: number) => {
                        const reasons = report.reason.split(", ");
                        return (
                          <>
                            <tr className="hover:bg-gray-50">
                              <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                                <div className="text-sm">
                                  <div
                                    onClick={() => {
                                      getPostData_Report(report?.id);
                                    }}
                                  >
                                    <div
                                      className="font-medium text-blue-600 cursor-pointer"
                                      onClick={handleOpenShareModal}
                                    >
                                      {report?.id}
                                    </div>
                                    <Modal
                                      // backdrop="blur"
                                      isOpen={isShareModalOpen}
                                      onClose={onCloseShareModal}
                                      onOpenChange={onOpenChange}
                                      motionProps={{
                                        variants: {
                                          enter: {
                                            y: 0,
                                            opacity: 1,
                                            transition: {
                                              duration: 0.3,
                                              ease: "easeOut",
                                            },
                                          },
                                          exit: {
                                            y: -20,
                                            opacity: 0,
                                            transition: {
                                              duration: 0.2,
                                              ease: "easeIn",
                                            },
                                          },
                                        },
                                      }}
                                    >
                                      <div className="fixed inset-0 backdrop-blur-sm bg-gray-600 bg-opacity-1">
                                        <ModalContent>
                                          {(onClose) => (
                                            <>
                                              <div className="flex justify-center">
                                                <ModalHeader className="flex gap-1">
                                                  Bài viết báo cáo
                                                </ModalHeader>
                                              </div>
                                              <ModalBody className="flex justify-start">
                                                <div className="flex">
                                                  <div className="postWrapper w-full dark:bg-[#242526]">
                                                    <div className="header">
                                                      <div className="left">
                                                        <Image
                                                          src={
                                                            postData?.avatarUrl !=
                                                            ""
                                                              ? postData?.avatarUrl
                                                              : avatarDefault.src
                                                          }
                                                          alt=""
                                                          className="profileImg"
                                                          onClick={() =>
                                                            router.push(
                                                              `/profile?id_user=${postData?.userId}`
                                                            )
                                                          }
                                                        />
                                                        <div className="userDetails">
                                                          <div
                                                            className="name"
                                                            onClick={() =>
                                                              router.push(
                                                                `/profile?id_user=${postData?.userId}`
                                                              )
                                                            }
                                                          >
                                                            {postData?.fullName}
                                                          </div>
                                                          <div className="feeling">
                                                            @
                                                            {postData?.username}
                                                          </div>
                                                          <div className="feeling">
                                                            {postData?.created_at?.slice(
                                                              0,
                                                              10
                                                            )}{" "}
                                                            {postData?.created_at?.slice(
                                                              11,
                                                              19
                                                            )}
                                                          </div>
                                                        </div>
                                                      </div>
                                                      <div className="right"></div>
                                                    </div>
                                                    <div className="feeling">
                                                      <p className="dark:text-white">
                                                        {postData?.content}
                                                      </p>
                                                    </div>

                                                    <div>
                                                      {postData?.attachments
                                                        ?.length! > 1 ? (
                                                        <Slider {...settings}>
                                                          {postData?.attachments?.map(
                                                            (items, index) => (
                                                              console.log(
                                                                items
                                                              ),
                                                              (
                                                                <div>
                                                                  <Image
                                                                    key={index}
                                                                    src={
                                                                      items.url
                                                                    }
                                                                    alt=""
                                                                    className="postImage"
                                                                    onClick={
                                                                      onOpen
                                                                    }
                                                                  />
                                                                  <Modal
                                                                    isOpen={
                                                                      isOpen
                                                                    }
                                                                    onOpenChange={
                                                                      onOpenChange
                                                                    }
                                                                    size="xl"
                                                                  >
                                                                    <ModalContent>
                                                                      {(
                                                                        onClose
                                                                      ) => (
                                                                        <>
                                                                          <ModalBody>
                                                                            <Slider
                                                                              {...settings}
                                                                            >
                                                                              {postData?.attachments?.map(
                                                                                (
                                                                                  items,
                                                                                  index
                                                                                ) => (
                                                                                  console.log(
                                                                                    items
                                                                                  ),
                                                                                  (
                                                                                    <div>
                                                                                      <Image
                                                                                        key={
                                                                                          index
                                                                                        }
                                                                                        src={
                                                                                          items.url
                                                                                        }
                                                                                        alt=""
                                                                                        className="postImage"
                                                                                        width={
                                                                                          900
                                                                                        }
                                                                                      />
                                                                                    </div>
                                                                                  )
                                                                                )
                                                                              )}
                                                                            </Slider>
                                                                          </ModalBody>
                                                                        </>
                                                                      )}
                                                                    </ModalContent>
                                                                  </Modal>
                                                                </div>
                                                              )
                                                            )
                                                          )}
                                                        </Slider>
                                                      ) : (
                                                        postData?.attachments?.map(
                                                          (items, index) => (
                                                            <>
                                                              <Image
                                                                key={index}
                                                                src={items.url}
                                                                alt=""
                                                                className="postImage"
                                                                onClick={onOpen}
                                                              />
                                                              <Modal
                                                                isOpen={isOpen}
                                                                onOpenChange={
                                                                  onOpenChange
                                                                }
                                                                size="2xl"
                                                              >
                                                                <ModalContent>
                                                                  {(
                                                                    onClose
                                                                  ) => (
                                                                    <>
                                                                      <ModalBody>
                                                                        <Image
                                                                          isZoomed
                                                                          key={
                                                                            index
                                                                          }
                                                                          src={
                                                                            items.url
                                                                          }
                                                                          alt=""
                                                                          className="postImage"
                                                                        />
                                                                      </ModalBody>
                                                                    </>
                                                                  )}
                                                                </ModalContent>
                                                              </Modal>
                                                            </>
                                                          )
                                                        )
                                                      )}
                                                    </div>
                                                  </div>
                                                </div>
                                                {/* <Button
                                            className="bg-[#377375] px-6 py-2 cursor-pointer rounded-full text-white hover:opacity-100 opacity-95 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#377375] focus-within:ring-offset-2 mb-3"
                                            onClick={() => {
                                              handleSharePost();
                                              onClose();
                                              setText("");
                                            }}
                                          >
                                            Post
                                          </Button> */}
                                              </ModalBody>
                                              <ModalFooter>
                                                <Button
                                                  color="danger"
                                                  variant="light"
                                                  onPress={onClose}
                                                >
                                                  Close
                                                </Button>
                                                <Button
                                                  color="primary"
                                                  onClick={() => {
                                                    Ban_User(
                                                      data?.data?.profile
                                                        ?.id as string
                                                    );
                                                    onClose();
                                                  }}
                                                >
                                                  Ban User
                                                </Button>
                                              </ModalFooter>
                                            </>
                                          )}
                                        </ModalContent>
                                      </div>
                                    </Modal>
                                  </div>
                                  <div className="text-gray-400">
                                    {report?.post?.username}
                                  </div>
                                </div>
                              </th>
                              <td className="px-6 py-4">
                                {formatDate(report?.createdAt)}
                              </td>
                              <td className="px-6 py-4">
                                {report?.user?.username}
                              </td>
                              <td className="px-6 py-4">
                                <div className="flex gap-2">
                                  {reasons.map((reason, index) => (
                                    <span
                                      key={index}
                                      className={`inline-flex items-center gap-1 rounded-full ${getBackgroundColor(
                                        index
                                      )} px-2 py-1 text-xs font-semibold ${getTextColor(
                                        index
                                      )}`}
                                    >
                                      {reason}
                                    </span>
                                  ))}
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <div
                                  className="flex justify-center gap-4"
                                  onClick={() => {
                                    handleDeletePost(report?.id);
                                  }}
                                >
                                  <a x-data="{ tooltip: 'Delete' }" href="#">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      strokeWidth="1.5"
                                      stroke="currentColor"
                                      className="h-6 w-6"
                                      x-tooltip="tooltip"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                      />
                                    </svg>
                                  </a>
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <div className="flex justify-center">
                                  {report.status === "RESOLVED" ? (
                                    <Checkbox
                                      defaultSelected
                                      color="success"
                                      isDisabled
                                    />
                                  ) : (
                                    <Checkbox
                                      color="success"
                                      onClick={() =>
                                        updateReportStatus(
                                          report.id,
                                          report.status
                                        )
                                      }
                                    />
                                  )}
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <div className="flex justify-center"></div>
                              </td>
                            </tr>
                          </>
                        );
                      })}
                  </tbody>
                </table>
              </div>